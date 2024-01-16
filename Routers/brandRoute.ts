
import express from 'express';
import {getAllBrands} from '../Controllers/brandController.js';
const router = express.Router();

router.get('/', getAllBrands);
// router.get('/', (req,res)=>{
//   res.json('hello world')
// });


export default router
