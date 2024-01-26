"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileCategories = exports.getTopCategories = exports.getHandpickedCategories = exports.getAllCategories = void 0;
const categoryService = __importStar(require("../Services/categoryService"));
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};
exports.getAllCategories = getAllCategories;
const getHandpickedCategories = async (req, res) => {
    try {
        const categories = await categoryService.getHandpickedCategories();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};
exports.getHandpickedCategories = getHandpickedCategories;
const getTopCategories = async (req, res) => {
    try {
        const categories = await categoryService.getTopCategories();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};
exports.getTopCategories = getTopCategories;
const getMobileCategories = async (req, res) => {
    try {
        const categories = await categoryService.getMobileCategories();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error2' });
    }
};
exports.getMobileCategories = getMobileCategories;
//Serch products by category ID is implemented in the product service ,you just need to provide a categoryId in the query 
