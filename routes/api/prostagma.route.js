const express = require('express');
const router = express.Router();
// import * as authController from '../../controllers/auth.controller';
const authController = require('../../controllers/auth.controller');
const teamsController = require('../../controllers/teams.controller');
const ladderController = require('../../controllers/ladder.controller');
const findController = require('../../controllers/find.controller');
const chatController = require('../../controllers/chat.controller');
const profileController = require('../../controllers/profile.controller');
const DbGamesAdminController = require('../../database/admin/controllers/gamesDb.controller');
const DbGamesController = require('../../database/controllers/games/gamesDb.controller');
const DbCategoriesController = require('../../database/admin/controllers/categoriesDb.controller');
// import * as DbUserConnectTS from '../../server/controllers/auth/auth.connect';
const DbUserConnectTS = require('../../server/controllers/auth/auth.connect');
const DbUserSaveTS = require('../../server/controllers/auth/auth.save-user');
const DbGetUsersTS = require('../../server/controllers/users/users.db');
const DbChatRequests = require('../../server/controllers/chat/chat.request');
const DbRooms = require('../../server/controllers/rooms/rooms.db');

//AUTH ROUTES
// GET
router.get('/connect', authController.connect);
// POST
router.post('/subscribe', authController.subscribe);
router.post('/login', authController.login);
//TEAMS ROUTES
// GET
router.get('/teams', authController.authCheck, teamsController.connect);
router.get('/teams/connect', teamsController.connect);
//LADDER ROUTES
// GET
router.get('/ladder/home', authController.authCheck, ladderController.connect);
//FIND ROUTES
// GET
router.get('/find/home', authController.authCheck, findController.connect);
//CHAT ROUTES
// GET
router.get('/chat/home', authController.authCheck, chatController.connect);

//PROFILE ROUTES
//POST
router.post('/profile/getSummoner', profileController.getSummoner);
//DB ROUTES
router.post('/db/saveUser', DbUserSaveTS.saveUser);
router.post('/db/connect', DbUserConnectTS.userConnection);
router.post('/db/connectWithLS', DbUserConnectTS.userConnectionWithLS);
router.post('/db/signOutUser', DbUserConnectTS.signOutUser);
router.post('/db/updateUserSocketId', DbUserConnectTS.updateUserSocketId);
router.get('/db/getUsers', DbGetUsersTS.getUsers);
// router.post('/db/getUsersById', DbGetUsersTS.getUserById);
router.post('/db/getUserByEmail', DbGetUsersTS.getUserByEmail);
router.post('/db/getUserBySocketId', DbUserConnectTS.getUserBySocketId);

router.post('/db/initChatRequest', DbChatRequests.initChatRequest);
router.post('/db/getChatRequests', DbChatRequests.getChatRequests);
router.post('/db/getAllChatRequests', DbChatRequests.getAllChatRequests);
router.post('/db/updateChatRequest', DbChatRequests.updateChatRequest);
router.post('/db/initNewConversation', DbChatRequests.initNewConversation);
router.post('/db/saveRoom', DbRooms.saveRoom);
router.post('/db/getRoomsByUserId', DbRooms.getRoomsByUserId);
router.post('/db/getAndUpdateRoomByChatRequestId', DbRooms.getAndUpdateRoomByChatRequestId);



router.get('/db/getGames', DbGamesController.getGames);

// DB ADMIN ROUTES
router.get('/db/admin/getGames', DbGamesAdminController.getGames);
router.get('/db/admin/getCategories', DbCategoriesController.getCategories);
router.post('/db/admin/addCategories', DbCategoriesController.addCategories);
router.post('/db/admin/addGame', DbGamesAdminController.addGame);
router.delete('/db/admin/deleteGame/:id', DbGamesAdminController.deleteGame);
router.delete('/db/admin/deleteCategory/:id', DbCategoriesController.deleteCategories);
module.exports = router;
