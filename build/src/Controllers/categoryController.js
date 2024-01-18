"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const db = require('../Database/Models/index.ts');
const getAllCategories = async (_req, res) => {
    try {
        const categories = await db.Category.findAll();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};
exports.getAllCategories = getAllCategories;
