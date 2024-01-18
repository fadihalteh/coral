"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {getUserWishlist,removeProductFromWishlist,addProductToWishlist,toggleProductInWishlist,DeleteUserWishlist} from '../Controllers/wishlistController';
const router = express_1.default.Router();
// router.post('/toggle/',toggleProductInWishlist ),
// router.post('/product',addProductToWishlist),
// router.delete('/product/:productId',removeProductFromWishlist),
// router.get('/',getUserWishlist );
// router.delete('/',DeleteUserWishlist );
exports.default = router;
