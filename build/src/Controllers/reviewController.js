"use strict";
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
const postReview = async (req, res) => {
    try {
        const { error, value } = reviewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { rating, comment } = value;
        const product_id = req.params.product_id;
        const existingProduct = await db.products.findOne({ where: { product_id } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const newReview = await db.reviews.create({ user_id: req.session.user_id, product_id, rating, comment });
        return res.status(200).json(newReview);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.postReview = postReview;
const updateReview = async (req, res) => {
    try {
        const { error, value } = reviewSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const product_id = req.params.product_id;
        const existingProduct = await db.products.findOne({ where: { product_id, } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const existingReview = await db.reviews.findOne({ where: { user_id: req.session.user_id, product_id } });
        if (!existingReview) {
            return res.status(404).json({ error: 'user review for this product not found' });
        }
        const newReview = await db.reviews.update(value, { where: { user_id: req.session.user_id, product_id } });
        return res.status(200).json(newReview);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const existingProduct = await db.products.findOne({ where: { product_id, } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'product not found' });
        }
        const existingReview = await db.reviews.findOne({ where: { user_id: req.session.user_id, product_id } });
        if (!existingReview) {
            return res.status(404).json({ error: 'user review for this product not found' });
        }
        const newReview = await db.reviews.destroy({ where: { user_id: req.session.user_id, product_id } });
        return res.status(200).json(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteReview = deleteReview;
const getAllUserReviews = async (req, res) => {
    try {
        const reviews = await db.reviews.findAll({ where: { user_id: req.session.user_id } });
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllUserReviews = getAllUserReviews;
