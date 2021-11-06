import * as express from "express";
import * as DbUserConnectTS from '../../server/controllers/auth/auth.connect';
import * as DbUserSaveTS from '../../server/controllers/auth/auth.save-user';
import * as DbGetUsersTS from '../../server/controllers/users/users.db';
import * as DbChatRequests from '../../server/controllers/chat/chat.request';
import * as DbRooms from '../../server/controllers/rooms/rooms.db';

export const api = express.Router();

api.post('/db/saveUser', DbUserSaveTS.saveUser);
api.post('/db/connect', DbUserConnectTS.userConnection);
api.post('/db/connectWithLS', DbUserConnectTS.userConnectionWithLS);
api.post('/db/signOutUser', DbUserConnectTS.signOutUser);
api.post('/db/updateUserSocketId', DbUserConnectTS.updateUserSocketId);
api.get('/db/getUsers', DbGetUsersTS.getUsers);
api.post('/db/getUsersById', DbGetUsersTS.getUserById);
api.post('/db/getUserByEmail', DbGetUsersTS.getUserByEmail);
api.post('/db/getUserBySocketId', DbUserConnectTS.getUserBySocketId);

api.post('/db/initChatRequest', DbChatRequests.initChatRequest);
api.post('/db/getChatRequests', DbChatRequests.getChatRequests);
api.post('/db/getAllChatRequests', DbChatRequests.getAllChatRequests);
api.post('/db/updateChatRequest', DbChatRequests.updateChatRequest);
api.post('/db/initNewConversation', DbChatRequests.initNewConversation);
api.post('/db/saveRoom', DbRooms.saveRoom);
api.post('/db/getRoomsByUserId', DbRooms.getRoomsByUserId);
api.post('/db/getAndUpdateRoomByChatRequestId', DbRooms.getAndUpdateRoomByChatRequestId);

api.use('/prostagmaApi', api);


