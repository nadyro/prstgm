"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = __importStar(require("socket.io"));
const request = require("request");
const Rooms_1 = require("../models/Rooms");
const errorCodes_1 = require("../server/tools/errors/errorCodes");
const NODE_ENV = process.env.NODE_ENV;
let urlController;
console.log(NODE_ENV);
if (NODE_ENV === 'development')
    urlController = 'http://localhost:8083/api/prostagmaApi/';
else
    urlController = 'http://prostagma.fr/api/prostagmaApi/';
function requestFunction(url, object) {
    return new Promise((resolve, reject) => {
        request.post({
            url: urlController + url,
            qs: object
        }, (err, httpResponse, body) => {
            // @ts-ignore
            if (errorCodes_1.ErrorsText[body * 1] && body * 1 === errorCodes_1.ErrorsText[body * 1].statusCode) {
                // @ts-ignore
                reject(errorCodes_1.ErrorsText[httpResponse.statusCode]);
                return false;
            }
            const chatRequest = JSON.parse(body);
            resolve(chatRequest);
        });
    });
}
exports.sockets = (server) => {
    const io = socketIo.listen(server);
    const chatSocketHandler = io.of('/chat');
    chatSocketHandler.on('connection', (socket) => {
        socket.on('pingConnection', (user) => __awaiter(void 0, void 0, void 0, function* () {
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
                    rooms.forEach((room) => {
                        chatSocketHandler.sockets[u.socketId].join(room.userIds);
                        chatSocketHandler.to(room.userIds).emit('userReconnected', u);
                    });
                })
                    .catch(e => {
                    console.log(e);
                });
            });
        }));
        socket.on('joinRoom', (socketIds) => __awaiter(void 0, void 0, void 0, function* () {
            const room = new Rooms_1.Rooms();
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
                    arraySocketIds.forEach((socketId) => {
                        chatSocketHandler.to(socketId).emit('createChat', 'You have joined');
                        chatSocketHandler.sockets[socketId].join(userIds);
                    });
                    console.log(userIds);
                    room.roomId = roomId;
                    room.users = users;
                    room.userIds = userIds;
                    const saveRoom = requestFunction('/db/saveRoom', room)
                        .catch(e => {
                        console.log('wtf');
                        console.log(e);
                    });
                }
            });
        }));
        socket.on('disconnect', (infos) => __awaiter(void 0, void 0, void 0, function* () {
            const obj = { socketIds: [socket.id] };
            requestFunction('db/getUserBySocketId', obj)
                .then(user => {
                if (user !== 'No user found.') {
                    const userToDisconnect = { userID: user[0]._id };
                    requestFunction('db/getRoomsByUserId', user[0])
                        .then(rooms => {
                        rooms.forEach((room) => {
                            chatSocketHandler.to(room.userIds).emit('userDisconnection', user[0]);
                        });
                    });
                    requestFunction('db/signOutUser', userToDisconnect)
                        .then((u) => {
                        console.log(u.username + ' has disconnected');
                    })
                        .catch(e => {
                        console.log('Error while disconnecting user');
                        console.log(e);
                    });
                }
            }).catch(e => {
                console.log(e);
            });
        }));
        socket.on('simpleMessage', (response) => {
            chatSocketHandler.to(`${response.chatRequest.socketId}`).emit('newConv', response.sender);
            chatSocketHandler.to(`${response.chatRequest.socketId}`).emit('msgReceived', response);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc29ja2V0cy9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLG1DQUFvQztBQUlwQywyQ0FBc0M7QUFHdEMsa0VBQXlFO0FBRXpFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ3RDLElBQUksYUFBcUIsQ0FBQztBQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RCLElBQUksUUFBUSxLQUFLLGFBQWE7SUFDNUIsYUFBYSxHQUFHLHlDQUF5QyxDQUFDOztJQUUxRCxhQUFhLEdBQUcsdUNBQXVDLENBQUM7QUFJMUQsU0FBUyxlQUFlLENBQUMsR0FBVyxFQUFFLE1BQVk7SUFDaEQsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMxQyxPQUFPLENBQUMsSUFBSSxDQUNWO1lBQ0UsR0FBRyxFQUFFLGFBQWEsR0FBRyxHQUFHO1lBQ3hCLEVBQUUsRUFBRSxNQUFNO1NBQ1gsRUFBRSxDQUFDLEdBQVEsRUFBRSxZQUFpQixFQUFFLElBQVMsRUFBRSxFQUFFO1lBQzVDLGFBQWE7WUFDYixJQUFJLHVCQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssdUJBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO2dCQUN4RSxhQUFhO2dCQUNiLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7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