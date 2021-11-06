import * as socketIo from 'socket.io';
import request = require("request");
import {ChatRequests} from "../models/ChatRequests";
import {Users} from "../models/Users";
import {Conversation} from "../models/Conversation";
import {Rooms} from "../models/Rooms";
import {Message} from "../models/Message";
import {Server} from "socket.io";
import {ErrorCodes, ErrorsText} from "../server/tools/errors/errorCodes";

const NODE_ENV = process.env.NODE_ENV;
let urlController: string;
console.log(NODE_ENV);
if (NODE_ENV === 'development')
  urlController = 'http://localhost:8083/api/prostagmaApi/';
else
  urlController = 'http://prostagma.fr/api/prostagmaApi/';

export let chatRequests: ChatRequests[];

function requestFunction(url: string, object?: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    request.post(
      {
        url: urlController + url,
        qs: object
      }, (err: any, httpResponse: any, body: any) => {
        // @ts-ignore
        if (ErrorsText[body * 1] && body * 1 === ErrorsText[body * 1].statusCode) {
          // @ts-ignore
          reject(ErrorsText[httpResponse.statusCode]);
          return false;
        }
        const chatRequest = JSON.parse(body);
        resolve(chatRequest);
      });
  });
}

export const sockets = (server: any) => {
  const io = socketIo.listen(server);
  const chatSocketHandler = io.of('/chat');

  chatSocketHandler.on('connection', (socket) => {
    socket.on('pingConnection', async (user: Users) => {
      console.log('user');
      const obj = {
        userId: user._id,
        socketId: socket.id
      };
      requestFunction('db/updateUserSocketId', obj)
        .then(u => {
          chatSocketHandler.emit('connectedUser', u);
          chatSocketHandler.emit('userToPush', u);
          requestFunction('db/getRoomsByUserId', u)
            .then(rooms => {
              rooms.forEach((room: Rooms) => {
                chatSocketHandler.sockets[u.socketId].join(room.userIds);
                chatSocketHandler.to(room.userIds).emit('userReconnected', u);
              });
            })
            .catch(e => {
              console.log(e);
            })
        })
    });

    socket.on('joinRoom', async (socketIds) => {
      const room = new Rooms();
      const roomId = socketIds;
      const arraySocketIds = socketIds.split('&');
      const obj = {
        socketIds: arraySocketIds,
        roomID: roomId
      };
      requestFunction('db/getUserBySocketId', obj)
        .then(users => {
          if (users !== '0') {
            let userIds = '';
            let i = 0;
            while (i < users.length) {
              userIds += users[i]._id;
              if (i + 1 !== users.length) {
                userIds += '#';
              }
              i++;
            }
            arraySocketIds.forEach((socketId: string) => {
              chatSocketHandler.to(socketId).emit('createChat', 'You have joined');
              chatSocketHandler.sockets[socketId].join(userIds);
            });
            console.log(userIds);
            room.roomId = roomId;
            room.users = users;
            room.userIds = userIds;
            const saveRoom: Promise<Rooms> = requestFunction('/db/saveRoom', room)
              .catch(e => {
                console.log('wtf');
                console.log(e);
              })
          }
        });
    });

    socket.on('disconnect', async (infos) => {
      const obj = {socketIds: [socket.id]};
      requestFunction('db/getUserBySocketId', obj)
        .then(user => {
          if (user !== 'No user found.') {
            const userToDisconnect = {userID: user[0]._id};
            requestFunction('db/getRoomsByUserId', user[0])
              .then(rooms => {
                rooms.forEach((room: Rooms) => {
                  chatSocketHandler.to(room.userIds).emit('userDisconnection', user[0]);
                });
              });
            requestFunction('db/signOutUser', userToDisconnect)
              .then((u: Users) => {
                console.log(u.username + ' has disconnected');
              })
              .catch(e => {
                console.log('Error while disconnecting user');
                console.log(e);
              })
          }
        }).catch(e => {
        console.log(e);
      })
    });
    socket.on('simpleMessage', (response: Message) => {
      chatSocketHandler.to(`${response.chatRequest.socketId}`).emit('newConv', response.sender);
      chatSocketHandler.to(`${response.chatRequest.socketId}`).emit('msgReceived', response);
    });
  });
};

