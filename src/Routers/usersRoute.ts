import express from 'express';
import {loginUser,createUser,logoutUser,changePassword,checkSessionId,changeUsername,getUserDetails,updateUserDetails,deleteUserAccount} from '../controllers/userController';

const router = express.Router();
router.post('/signin', loginUser);
router.post('/signup',createUser);
router.get('/signout',checkSessionId,logoutUser);
router.put('/change-password/:userId',checkSessionId,changePassword);
router.put('/change-username/:userId',checkSessionId,changeUsername);
router.get('/:userid',checkSessionId,getUserDetails);
router.put('/:userid',checkSessionId,updateUserDetails);
router.delete('/:userid',checkSessionId,deleteUserAccount);




export default router;
