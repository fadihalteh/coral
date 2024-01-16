import express from 'express';
import {getAllCategories} from '../Controllers/categoryController.js';
const router = express.Router();

router.get('/', getAllCategories);
// router.get('/', (req,res)=>{
//   res.json('hello world')
// });


export default router
