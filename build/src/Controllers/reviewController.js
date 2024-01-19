"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserReviews = exports.deleteReview = exports.updateReview = exports.postReview = void 0;
const db = require('../Database/Models/index');
const joi_1 = __importDefault(require("joi"));
const reviewSchema = joi_1.default.object({
    comment: joi_1.default.string().min(1).max(400),
    rating: joi_1.default.number().integer().min(1).max(5),
});
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = reviewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { rating, comment } = value;
        const product_id = req.params.product_id;
        const existingProduct = yield db.products.findOne({ where: { product_id } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const newReview = yield db.reviews.create({ user_id: req.session.user_id, product_id, rating, comment });
        return res.status(200).json(newReview);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.postReview = postReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = reviewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const product_id = req.params.product_id;
        const existingProduct = yield db.products.findOne({ where: { product_id, } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const existingReview = yield db.reviews.findOne({ where: { user_id: req.session.user_id, product_id } });
        if (!existingReview) {
            return res.status(404).json({ error: 'user review for this product not found' });
        }
        const newReview = yield db.reviews.update(value, { where: { user_id: req.session.user_id, product_id } });
        return res.status(200).json(newReview);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.product_id;
        const existingProduct = yield db.products.findOne({ where: { product_id, } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const existingReview = yield db.reviews.findOne({ where: { user_id: req.session.user_id, product_id } });
        if (!existingReview) {
            return res.status(404).json({ error: 'user review for this product not found' });
        }
        const newReview = yield db.reviews.destroy({ where: { user_id: req.session.user_id, product_id } });
        return res.status(200).json(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteReview = deleteReview;
const getAllUserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield db.reviews.findAll({ where: { user_id: req.session.user_id } });
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllUserReviews = getAllUserReviews;
