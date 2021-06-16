const SerialPort = require('serialport'); 
const Readline = require('@serialport/parser-readline')

const { getHR } = require('../commands');
const { io } = require('../server');
const { exampleExam } = require('../constants');
const buffer = 8;


const port = new SerialPort("COM2", {
  baudRate: 9600
});

parser = port.pipe(new Readline({ delimiter: '\r\n' }));

io.on('connection', (socket) => {
  console.log("New coonection");
});
parser.on('data', data => {
  aux2.push(data.toString());
  console.log("signal", aux2, aux2[0].length)
  for(bit of [...aux2[0]]) {
    if(aux.length === buffer) {
      io.sockets.emit('get-serial', { value: getHR(aux).toFixed(2) })
      
      currentValue = aux;
      aux = '';
      break;
    }
    if(bit.indexOf('\n') > -1 || bit.indexOf('\r') > -1) {
      if(aux.length !== buffer) {
        // console.log("BREAK", aux.length)
        aux = '';
      } 
    } else {
      aux = aux + bit;
    }
  }
  aux2 = []
})

const emitData = (value) => {
  io.sockets.emit('get-serial', {
    value: getHR(value)
  })
} 

parser.on('open', function() {
  console.log("open");
})
let aux = ''; 
let aux2 = [];
let currentValue;


// serial.on('data', function(data) {
//   console.log(data)
//   io.emit('get-serial', {
//     value: getHR(data.toString())
//   })
// })



