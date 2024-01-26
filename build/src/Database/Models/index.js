"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dbConfig_1 = __importDefault(require("../Config/dbConfig"));
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.mysql_database || dbConfig_1.default.DB, process.env.mysql_username || dbConfig_1.default.USER, process.env.mysql_password || dbConfig_1.default.PASSWORD, {
    host: process.env.mysql_host || dbConfig_1.default.HOST,
    dialect: "mysql",
    pool: {
        max: 10,
        min: 1,
    },
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Connected to the database.");
})
    .catch((err) => {
    console.error("Error connecting to the database:", err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = exports.sequelize;
db.users = require("./user")(exports.sequelize, sequelize_1.DataTypes);
db.addresses = require("./address")(exports.sequelize, sequelize_1.DataTypes);
db.reviews = require("./review")(exports.sequelize, sequelize_1.DataTypes);
db.products = require("./product")(exports.sequelize, sequelize_1.DataTypes);
db.wishlists = require("./wishlist")(exports.sequelize, sequelize_1.DataTypes);
db.categories = require("./category")(exports.sequelize, sequelize_1.DataTypes);
db.brands = require("./brand")(exports.sequelize, sequelize_1.DataTypes);
db.orders = require("./order")(exports.sequelize, sequelize_1.DataTypes);
db.ordersItems = require("./orderItem")(exports.sequelize, sequelize_1.DataTypes);
db.discounts = require("./discount")(exports.sequelize, sequelize_1.DataTypes);
db.productsImages = require("./productImage")(exports.sequelize, sequelize_1.DataTypes);
db.shoppingCarts = require("./shoppingCart")(exports.sequelize, sequelize_1.DataTypes);
db.sessions = require("./session")(exports.sequelize, sequelize_1.DataTypes);
// User relations
db.addresses.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.reviews.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.sessions.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.orders.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.shoppingCarts.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.wishlists.belongsTo(db.users, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasMany(db.addresses, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasMany(db.reviews, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasMany(db.sessions, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasMany(db.orders, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasOne(db.shoppingCarts, {
    foreignKey: { name: "user_id", allowNull: false },
});
db.users.hasOne(db.wishlists, {
    foreignKey: { name: "user_id", allowNull: false },
});
//product relations
db.reviews.belongsTo(db.products, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.productsImages.belongsTo(db.products, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.ordersItems.belongsTo(db.products, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.shoppingCarts.belongsTo(db.products, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.wishlists.belongsTo(db.products, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.hasMany(db.productsImages, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.hasMany(db.reviews, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.hasMany(db.ordersItems, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.hasMany(db.shoppingCarts, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.hasMany(db.wishlists, {
    foreignKey: { name: "product_id", allowNull: false },
});
db.products.belongsTo(db.discounts, { foreignKey: { name: "discount_id" } });
db.products.belongsTo(db.brands, {
    foreignKey: { name: "brand_id", allowNull: false },
});
db.products.belongsTo(db.categories, {
    foreignKey: { name: "category_id", allowNull: false },
});
db.discounts.hasMany(db.products, { foreignKey: { name: "discount_id" } });
db.brands.hasMany(db.products, {
    foreignKey: { name: "brand_id", allowNull: false },
});
db.categories.hasMany(db.products, {
    foreignKey: { name: "category_id", allowNull: false },
});
//order relations
db.orders.hasMany(db.ordersItems, {
    foreignKey: { name: "order_id", allowNull: false },
});
db.orders.belongsTo(db.addresses, {
    foreignKey: { name: "address_id", allowNull: true },
});
db.ordersItems.belongsTo(db.orders, {
    foreignKey: { name: "order_id", allowNull: false },
});
db.addresses.hasMany(db.orders, {
    foreignKey: { name: "address_id", allowNull: true },
});
// Sync the s with the database
db.sequelize
    .sync({ alter: true })
    .then(() => {
    console.log("Database synchronization complete.");
})
    .catch((err) => {
    console.error("Error synchronizing the database:", err);
});
exports.default = db;
