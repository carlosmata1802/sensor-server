const SerialPort = require('serialport'); 
const Readline = require('@serialport/parser-readline')

const { getHR } = require('../commands');
const { io } = require('../server');
const { buffer } = require('../constants');

const port = new SerialPort(process.env.SERIAL_PORT, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

let aux = ''; 
let currentValue = '';
parser.on('data', data => {
  for(bit of [...data.toString()]) {
    if(aux.length === buffer) {
      if(aux !== currentValue) {
        io.sockets.emit('get-serial', { value: getHR(aux).toFixed(2) })
      }
      currentValue = aux;
      aux = '';
      break;
    }
    if(bit.indexOf('\n') > -1 || bit.indexOf('\r') > -1) {
      if(aux.length !== buffer) {
        aux = '';
      } 
    } else {
      aux = aux + bit;
    }
  }
});