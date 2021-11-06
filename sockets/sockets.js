// const disconnectFromChat = require("./chat/disconnect.chat-socket");

const socketIo = require('socket.io');
const request = require('request');
const sioRedis = require('socket.io-redis');
const chatNotification = require('../server/controllers/chat/chat.request');

const NODE_ENV = process.env.NODE_ENV;
let urlUserController;
if (NODE_ENV === 'dev')
  urlUserController = 'http://localhost:8083/api/prostagmaApi/db/getUsersById';
else
  urlUserController = 'http://prostagma.fr/api/prostagmaApi/db/getUsersById';
let user;
let chatRequest = {};
let roomId;
let roomIds = [];
let chatRequests = [];
function requestFunction(url, userObject) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: url,
        qs: userObject
      }, function (err, httpResponse, body) {
        if (err) {
          reject(err);
        }
        user = JSON.parse(body);
        resolve(user);
      });
  });
}

module.exports = function (server) {
  const io = socketIo.listen(server);
  console.log('sockets are listening');
  const categoriesSocketHandler = io.of('/categories');
  const chatSocketHandler = io.of('/chat');
  categoriesSocketHandler.on('connection', function (socket) {
    socket.emit('initCategories', 'Connected to categories socket handler.');
    socket.on('updateCategories', function (categories) {
      socket.emit('categories', categories);
    });
  });


  chatSocketHandler.on('connection', function (socket) {
    console.log('wsh?');
    socket.emit('initChats', 'Connected to chat socket handler');
    // disconnectFromChat.disconnectFromChat(socket, chatRequests);
    console.log(chatRequests);
    console.log(socket.id);
    socket.on('dsc', (data) => {
      console.log(data);
      console.log('disconnected');
      user = {};
      chatRequest = {};
    });
    socket.on('requestConnection', function (usersId) {
      //Store socket ID in server
      const usersIds = usersId.split(' ');
      const promiseRequester = requestFunction(urlUserController, {id: usersIds[0]});
      const promiseRecipient = requestFunction(urlUserController, {id: usersIds[2]});
      promiseRequester.then(requester => {
        promiseRecipient.then(recipient => {
          roomId = requester._id + '#' + recipient._id;
          const sm = {
            statusMessage: 'Initializing room between ' + requester.username + ' and ' + recipient.username + '.',
            roomId: roomId
          };
          //Store roomId in socket
          chatSocketHandler.emit('roomId', roomId);
          socket.join(roomId);
          roomIds.push(roomId);
          chatSocketHandler.to(roomId).emit('initChat', sm);
          chatRequest.roomId = roomId;
          chatRequest.requester = requester;
          chatRequest.recipient = recipient;
          chatRequest.creationDate = Date.now();
          chatRequest.fulfilled = false;
          const req = {
            query: {
              requesterId: requester._id,
              recipientId: recipient._id,
              object: chatRequest,
              objectName: 'CHATREQUEST'
            }
          };
          chatRequests.push(chatRequest);
          chatNotification.initChatRequest(req)
            .then(() => {
              chatSocketHandler.emit('fulfill', chatRequest);
            });
        });
      });
    });
    socket.on('fulfilled', function (cr) {
      chatRequests.forEach(r => {
        if (r.roomId === cr.cr.roomId) {
          socket.join(r.roomId);
          chatSocketHandler.to(r.roomId).emit('welcome', r);
        }
      });
    });
    socket.on('simpleMessage', function (response) {
      console.log(response);
      roomIds.forEach(ri => {
        if (response.roomId === ri) {
          chatSocketHandler.to(ri).emit('msgReceived', response);
        }
      });
    });
  });
};
