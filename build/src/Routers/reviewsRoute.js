"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../Controllers/reviewController");
const router = express_1.default.Router();
router.post('/:productId', reviewController_1.postReview);
router.put('/:productId', reviewController_1.updateReview);
router.delete('/:productId', reviewController_1.deleteReview);
router.get('/', reviewController_1.getAllUserReviews);
exports.default = router;
