import * as express from "express";
import * as DbUserConnectTS from '../../server/controllers/auth/auth.connect';
import * as DbUserSaveTS from '../../server/controllers/auth/auth.save-user';
import * as DbGetUsersTS from '../../server/controllers/users/users.db';
import * as DbChatRequests from '../../server/controllers/chat/chat.request';
import * as DbRooms from '../../server/controllers/rooms/rooms.db';
import * as API_URL from "../tools/urls/api.url";

export const api = express.Router();

api.post(API_URL.DB + API_URL.SAVE_USER, DbUserSaveTS.saveUser);
api.post(API_URL.DB + API_URL.CONNECT, DbUserConnectTS.userConnection);
api.post(API_URL.DB + API_URL.CONNECT_WITH_LS, DbUserConnectTS.userConnectionWithLS);
api.post(API_URL.DB + API_URL.SIGN_OUT_USER, DbUserConnectTS.signOutUser);
api.post(API_URL.DB + API_URL.UPDATE_USER_SOCKET_ID, DbUserConnectTS.updateUserSocketId);
api.get(API_URL.DB + API_URL.GET_USERS, DbGetUsersTS.getUsers);
api.post(API_URL.DB + API_URL.GET_USER_BY_ID, DbGetUsersTS.getUserById);
api.post(API_URL.DB + API_URL.GET_USER_BY_EMAIL, DbGetUsersTS.getUserByEmail);
api.post(API_URL.DB + API_URL.GET_USER_BY_SOCKET_ID, DbUserConnectTS.getUserBySocketId);

api.post(API_URL.DB + API_URL.INIT_CHAT_REQUEST, DbChatRequests.initChatRequest);
api.post(API_URL.DB + API_URL.GET_CHAT_REQUESTS, DbChatRequests.getChatRequests);
api.post(API_URL.DB + API_URL.GET_ALL_CHAT_REQUESTS, DbChatRequests.getAllChatRequests);
api.post(API_URL.DB + API_URL.UPDATE_CHAT_REQUEST, DbChatRequests.updateChatRequest);
api.post(API_URL.DB + API_URL.INIT_NEW_CONVERSATION, DbChatRequests.initNewConversation);
api.post(API_URL.DB + API_URL.SAVE_ROOM, DbRooms.saveRoom);
api.post(API_URL.DB + API_URL.GET_ROOMS_BY_USER_ID, DbRooms.getRoomsByUserId);
api.post(API_URL.DB + API_URL.GET_AND_UPDATE_ROOM_BY_CHAT_REQUEST_ID, DbRooms.getAndUpdateRoomByChatRequestId);

api.use(API_URL.PROSTAGMA_API, api);


