import express from 'express';
import {getAllCategories,getHandpickedCategories} from '../Controllers/categoryController';
const router = express.Router();

router.get('/', getAllCategories);
router.get('/handpicked', getHandpickedCategories);


export default router
