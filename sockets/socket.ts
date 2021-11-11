import * as socketIo from 'socket.io';
import request = require("request");
import {ChatRequests} from "../models/ChatRequests";
import {Users} from "../models/Users";
import {Rooms} from "../models/Rooms";
import {Message} from "../models/Message";
import {ErrorsText} from "../server/tools/errors/errorCodes";
import * as API_URL from "../server/tools/urls/api.url";
import * as EVENT_URL from "../server/tools/urls/events.url";
import * as NAMESPACE_URL from "../server/tools/urls/namespace.url";

const NODE_ENV = process.env.NODE_ENV;
let urlController: string;
console.log(NODE_ENV);
if (NODE_ENV === 'development')
  urlController = API_URL.LOCALHOST("8083") + API_URL.API + API_URL.PROSTAGMA_API;
else
  urlController = API_URL.PROD + API_URL.API + API_URL.PROSTAGMA_API;

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
  const chatSocketHandler = io.of(NAMESPACE_URL.NAMESPACE_CHAT);

  chatSocketHandler.on(EVENT_URL.EVENT_CONNECTION, (socket) => {
    socket.on(EVENT_URL.EVENT_PING_CONNECTION, async (user: Users) => {
      console.log('user');
      const obj = {
        userId: user._id,
        socketId: socket.id
      };
      requestFunction(API_URL.DB + API_URL.UPDATE_USER_SOCKET_ID, obj)
        .then(u => {
          chatSocketHandler.emit(EVENT_URL.EVENT_CONNECTED_USER, u);
          chatSocketHandler.emit(EVENT_URL.EVENT_USER_TO_PUSH, u);
          requestFunction(API_URL.DB + API_URL.GET_ROOMS_BY_USER_ID, u)
            .then(rooms => {
              rooms.forEach((room: Rooms) => {
                chatSocketHandler.sockets[u.socketId].join(room.userIds);
                chatSocketHandler.to(room.userIds).emit(EVENT_URL.EVENT_USER_RECONNECTED, u);
              });
            })
            .catch(e => {
              console.log(e);
            })
        })
    });

    socket.on(EVENT_URL.EVENT_JOIN_ROOM, async (socketIds) => {
      const room = new Rooms();
      const roomId = socketIds;
      const arraySocketIds = socketIds.split('&');
      const obj = {
        socketIds: arraySocketIds,
        roomID: roomId
      };
      requestFunction(API_URL.DB + API_URL.GET_USER_BY_SOCKET_ID, obj)
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
              chatSocketHandler.to(socketId).emit(EVENT_URL.EVENT_CREATE_CHAT, 'You have joined');
              chatSocketHandler.sockets[socketId].join(userIds);
            });
            console.log(userIds);
            room.roomId = roomId;
            room.users = users;
            room.userIds = userIds;
            const saveRoom: Promise<Rooms> = requestFunction(API_URL.DB + API_URL.SAVE_ROOM, room)
              .catch(e => {
                console.log('wtf');
                console.log(e);
              })
          }
        });
    });

    socket.on(EVENT_URL.EVENT_DISCONNECT, async (infos) => {
      const obj = {socketIds: [socket.id]};
      requestFunction(API_URL.DB + API_URL.GET_USER_BY_SOCKET_ID, obj)
        .then(user => {
          if (user !== 'No user found.') {
            const userToDisconnect = {userID: user[0]._id};
            requestFunction(API_URL.DB + API_URL.GET_ROOMS_BY_USER_ID, user[0])
              .then(rooms => {
                rooms.forEach((room: Rooms) => {
                  chatSocketHandler.to(room.userIds).emit(EVENT_URL.EVENT_USER_DISCONNECTION, user[0]);
                });
              });
            requestFunction(API_URL.DB + API_URL.SIGN_OUT_USER, userToDisconnect)
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
    socket.on(EVENT_URL.EVENT_SIMPLE_MESSAGE, (response: Message) => {
      chatSocketHandler.to(`${response.chatRequest.socketId}`).emit(EVENT_URL.EVENT_NEW_CONV, response.sender);
      chatSocketHandler.to(`${response.chatRequest.socketId}`).emit(EVENT_URL.EVENT_MSG_RECEIVED, response);
    });
  });
};

