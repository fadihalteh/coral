import express from 'express';
import {getAllUserReviews,postReview,updateReview,deleteReview} from '../controllers/reviewController';
const router = express.Router();



router.post('/:productId',postReview);
router.put('/:productId',updateReview);
router.delete('/:productId',deleteReview);
router.get('/',getAllUserReviews );


export default router