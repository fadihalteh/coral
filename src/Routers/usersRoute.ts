import express from 'express';
import {loginUser,createUser,logoutUser,changePassword,changeUsername,getUserDetails,updateUserDetails,deleteUserAccount} from '../Controllers/userController';
import {checkSessionKey} from '../Middlewares/checkSession'
import upload from '../Middlewares/upload';
import db from '../Database/Models/index'

const router = express.Router();
router.post('/signin', loginUser);
router.post('/signup',createUser);
router.get('/signout',checkSessionKey,logoutUser);
router.put('/change-password',checkSessionKey,changePassword);
router.put('/change-username',checkSessionKey,changeUsername);
router.get('/:user_id',checkSessionKey,getUserDetails);
router.put('/:user_id',checkSessionKey,updateUserDetails);
router.delete('/:user_id',checkSessionKey,deleteUserAccount);
router.post('/profile-img',checkSessionKey,upload.single('profileImage'),async (req,res)=>{
    try {
        const file = req.file;
        const updateImage = await db.users.update({ profile_image:`uploads/${file.filename}`}, { where: { id: req.session.user_id } });
        res.json({ message: 'File uploaded successfully!' })
    } catch (error) {
        res.status(500).json({ error: 'Error updating user profile image' });
    }
})



export default router;
