"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoute_1 = __importDefault(require("./src/Routers/usersRoute"));
const addressesRoute_1 = __importDefault(require("./src/Routers/addressesRoute"));
const reviewsRoute_1 = __importDefault(require("./src/Routers/reviewsRoute"));
const productRoute_1 = __importDefault(require("./src/Routers/productRoute"));
const categoryRoute_1 = __importDefault(require("./src/Routers/categoryRoute"));
const brandRoute_1 = __importDefault(require("./src/Routers/brandRoute"));
const searchSuggestionsRoute_1 = __importDefault(require("./src/Routers/searchSuggestionsRoute"));
// import wishlistRoute from './Routers/wishlistRoute';
const ordersRoute_1 = __importDefault(require("./src/Routers/ordersRoute"));
const shoppingCartRoute_1 = __importDefault(require("./src/Routers/shoppingCartRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
}));
app.use(express_1.default.json());
app.use('/users', usersRoute_1.default);
app.use('/addresses', addressesRoute_1.default);
app.use('/reviews', reviewsRoute_1.default);
app.use('/products', productRoute_1.default);
app.use('/category', categoryRoute_1.default);
app.use('/brand', brandRoute_1.default);
app.use('/search-suggestions', searchSuggestionsRoute_1.default);
// app.use('/wishlist', wishlistRoute);
app.use('/orders', ordersRoute_1.default);
app.use('/shopping-cart', shoppingCartRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/// added 
