
import express from 'express';
import {getAllBrands} from '../Controllers/brandController.js';
const router = express.Router();

router.get('/', getAllBrands);


export default router
