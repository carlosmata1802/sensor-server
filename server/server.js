require('../config');
const cors = require('cors');
const app = require('express')();
app.use(cors())

const server = require('http').createServer(app);
const io = require('socket.io')(server);
module.exports = { io }
require('./serial');
server.listen(process.env.PORT , console.log(`Escuchando en puerto ${ process.env.PORT }`));
