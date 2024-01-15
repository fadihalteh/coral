import express from 'express';
import {getAllCategories} from '../Controllers/categoryController.js';
const router = express.Router();

router.get('/', getAllCategories);

export default router