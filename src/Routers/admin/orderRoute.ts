import express from 'express';
import {getOrderItemAnalyticsController} from '../../Controllers/admin/orderController';

const router = express.Router();

router.get('/', getOrderItemAnalyticsController);
// router.put('/:productId', updateProduct);
// router.delete('/:productId', deleteProduct);


export default router;
