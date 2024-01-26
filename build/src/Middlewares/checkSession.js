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
exports.checkSessionKey = void 0;
const userService = __importStar(require("../Services/userService"));
const checkSessionKey = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw {
                code: 401,
                message: 'Authorization header is missing',
            };
        }
        const result = await userService.checkSessionKey(authorizationHeader);
        req.session = result;
        next();
    }
    catch (error) {
        const statusCode = error.code || 500;
        res.status(statusCode).json({ error: error.message });
    }
};
exports.checkSessionKey = checkSessionKey;
