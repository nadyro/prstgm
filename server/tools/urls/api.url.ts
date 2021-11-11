export const LOCALHOST = (port: string): string => {
    return "http://localhost:" + port + "/";
};

export const PROD = "http://prostagma.fr";

export const API = "api/";
export const PROSTAGMA_API = "prostagmaApi/";

export const DB = "db/";

export const SAVE_USER = "saveUser/";
export const CONNECT = "connect/";
export const CONNECT_WITH_LS = "connectWithLS/";
export const SIGN_OUT_USER = "signOutUser/";
export const UPDATE_USER_SOCKET_ID = "updateUserSocketId/";
export const GET_USERS = "getUsers/";
export const GET_USER_BY_ID = "getUsersById/";
export const GET_USER_BY_EMAIL = "getUserByEmail/";
export const GET_USER_BY_SOCKET_ID = "getUserBySocketId/";
export const INIT_CHAT_REQUEST = "initChatRequest/";
export const GET_CHAT_REQUESTS = "getChatRequests/";
export const GET_ALL_CHAT_REQUESTS = "getAllChatRequests/";
export const UPDATE_CHAT_REQUEST = "updateChatRequest/";
export const INIT_NEW_CONVERSATION = "initNewConversation/";
export const SAVE_ROOM = "saveRoom/";
export const GET_ROOMS_BY_USER_ID = "getRoomsByUserId/";
export const GET_AND_UPDATE_ROOM_BY_CHAT_REQUEST_ID = "getAndUpdateRoomByChatRequestId/";
