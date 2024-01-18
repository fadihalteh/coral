"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrands = void 0;
const db = require('../Database/Models/index.ts');
const getAllBrands = async (_req, res) => {
    try {
        const brands = await db.Brand.findAll();
        return res.status(200).json(brands);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllBrands = getAllBrands;
