"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopBrands = exports.getAllBrands = void 0;
const index_1 = __importDefault(require("../Database/Models/index"));
const getAllBrands = async () => {
    return await index_1.default.brands.findAll();
};
exports.getAllBrands = getAllBrands;
const getTopBrands = async () => {
    return await index_1.default.brands.findAll({
        where: {
            name: {
                [index_1.default.Sequelize.Op.in]: [
                    "Zara",
                    "Prada",
                    "H&M",
                    "Dolce & Gabbana",
                    "Chanel",
                    "Biba",
                ],
            },
        },
    });
};
exports.getTopBrands = getTopBrands;
