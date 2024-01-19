"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../Controllers/brandController");
const router = express_1.default.Router();
router.get('/', brandController_1.getAllBrands);
exports.default = router;
