// import express, {Request, Response} from "express";
// import * as DbUserConnectTS from '../../../server/controllers/auth/auth.connect';
// import * as DbUserSaveTS from '../../../server/controllers/auth/auth.save-user';
// import * as DbGetUsersTS from '../../../server/controllers/users/users.db';
// import * as DbChatRequests from '../../../server/controllers/chat/chat.request';
// import * as DbRooms from '../../../server/controllers/rooms/rooms.db';
//
//
// const routes = express.Router();
// // DB ROUTES
// routes.post('/db/saveUser', DbUserSaveTS.saveUser);
// routes.post('/db/connect', DbUserConnectTS.userConnection);
// routes.post('/db/connectWithLS', DbUserConnectTS.userConnectionWithLS);
// routes.post('/db/signOutUser', DbUserConnectTS.signOutUser);
// routes.post('/db/updateUserSocketId', DbUserConnectTS.updateUserSocketId);
// routes.get('/db/getUsers', DbGetUsersTS.getUsers);
// routes.post('/db/getUsersById', DbGetUsersTS.getUserById);
// routes.post('/db/getUserByEmail', DbGetUsersTS.getUserByEmail);
// routes.post('/db/getUserBySocketId', DbUserConnectTS.getUserBySocketId);
//
// routes.post('/db/initChatRequest', DbChatRequests.initChatRequest);
// routes.post('/db/getChatRequests', DbChatRequests.getChatRequests);
// routes.post('/db/getAllChatRequests', DbChatRequests.getAllChatRequests);
// routes.post('/db/updateChatRequest', DbChatRequests.updateChatRequest);
// routes.post('/db/initNewConversation', DbChatRequests.initNewConversation);
// routes.post('/db/saveRoom', DbRooms.saveRoom);
// routes.post('/db/getRoomsByUserId', DbRooms.getRoomsByUserId);
// routes.post('/db/getAndUpdateRoomByChatRequestId', DbRooms.getAndUpdateRoomByChatRequestId);
//
// export const router: express.Router = routes;
