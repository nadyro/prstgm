const express = require('express');
// const app = express();
// const server = require('http').Server(app);

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const api = require('./routes/api.route');
const sockets = require('./sockets/sockets');
const cluster = require('cluster');
const net = require('net');
// const farmhash = require('farmhash');
const numProcesses = require('os').cpus().length;

const NODE_ENV = process.env.NODE_ENV;
// if (cluster.isMaster) {
//   let spawn;
//   const workers = [];
//   spawn = function (i) {
//     workers[i] = cluster.fork(NODE_ENV);
//     workers[i].on('exit', function (code, signal) {
//       console.log(code);
//       console.log(signal);
//       console.log('respawning worker: ', i);
//       spawn(i);
//     });
//   };
//   let y = 0;
//   while (y < numProcesses) {
//     spawn(y);
//     y++;
//   }
//   let spawnIndex = function (ip, len) {
//     console.log('Farmhash results :' + farmhash.fingerprint32(ip));
//     return farmhash.fingerprint32(ip) % len;
//   };
//
//   net.createServer({pauseOnConnect: true}, function (connection) {
//     console.log('just received a connection !!');
//     let worker = workers[spawnIndex(connection.remoteAddress, numProcesses)];
//     worker.send('sticky-session: connection', connection);
//   }).listen(8081, function () {
//     console.log('server is running');
//   });
// } else {
//   const app = new express();
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({extended: true}));
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({extended: false}));
//   app.use(cookieParser());
//   app.use('/api', api);
//   app.use(express.static(__dirname + '/dist/prostagma'));
//   const server = app.listen(8082, function () {
//     console.log('listening...');
//   });
//   sockets(server);
// }

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api', api);
app.use(express.static(__dirname + '/dist/prostagma'));
const server = app.listen(8082, function () {
  console.log('listening...');
});
sockets(server);
// server.listen(8081, function (request, response) {
//   console.log('server is running');
//   console.log('ok');
// });
// sockets(server);
// module.exports = app;
