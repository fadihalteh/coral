"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const router = express_1.default.Router();
router.post('/signin', userController_1.loginUser);
router.post('/signup', userController_1.createUser);
router.get('/signout', userController_1.checkSessionId, userController_1.logoutUser);
router.put('/change-password/:userId', userController_1.checkSessionId, userController_1.changePassword);
router.put('/change-username/:userId', userController_1.checkSessionId, userController_1.changeUsername);
router.get('/:userid', userController_1.checkSessionId, userController_1.getUserDetails);
router.put('/:userid', userController_1.checkSessionId, userController_1.updateUserDetails);
router.delete('/:userid', userController_1.checkSessionId, userController_1.deleteUserAccount);
exports.default = router;
