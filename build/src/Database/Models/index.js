"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = require('../config/dbConfig.ts');
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: { timestamps: false },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
    },
});
sequelize.authenticate()
    .then(() => {
    console.log('Connected to the database.');
})
    .catch(err => {
    console.error('Error connecting to the database:', err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.users = require('./user.ts')(sequelize, sequelize_1.DataTypes);
db.addresses = require('./address.ts')(sequelize, sequelize_1.DataTypes);
db.reviews = require('./review.ts')(sequelize, sequelize_1.DataTypes);
db.products = require('./product.ts')(sequelize, sequelize_1.DataTypes);
db.wishlists = require('./wishlist.ts')(sequelize, sequelize_1.DataTypes);
db.categories = require('./category.ts')(sequelize, sequelize_1.DataTypes);
db.brands = require('./brand.ts')(sequelize, sequelize_1.DataTypes);
db.orders = require('./order.ts')(sequelize, sequelize_1.DataTypes);
db.ordersItems = require('./orderItem.ts')(sequelize, sequelize_1.DataTypes);
db.discounts = require('./discount.ts')(sequelize, sequelize_1.DataTypes);
db.productsImages = require('./productImage.ts')(sequelize, sequelize_1.DataTypes);
db.shoppingCarts = require('./shoppingCart.ts')(sequelize, sequelize_1.DataTypes);
db.sessions = require('./session.ts')(sequelize, sequelize_1.DataTypes);
db.ordersRecipients = require('./OrderRecipient.ts')(sequelize, sequelize_1.DataTypes);
// User relations
db.addresses.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.reviews.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.sessions.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.orders.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.shoppingCarts.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.wishlists.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasMany(db.addresses, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasMany(db.reviews, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasMany(db.sessions, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasMany(db.orders, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasOne(db.shoppingCarts, { foreignKey: { name: 'user_id', allowNull: false } });
db.users.hasOne(db.wishlists, { foreignKey: { name: 'user_id', allowNull: false } });
//product relations
db.reviews.belongsTo(db.products, { foreignKey: { name: 'product_id', allowNull: false } });
db.productsImages.belongsTo(db.products, { foreignKey: { name: 'product_id', allowNull: false } });
db.ordersItems.belongsTo(db.products, { foreignKey: { name: 'product_id', allowNull: false } });
db.shoppingCarts.belongsTo(db.products, { foreignKey: { name: 'product_id', allowNull: false } });
db.wishlists.belongsTo(db.products, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.hasMany(db.productsImages, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.hasMany(db.reviews, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.hasMany(db.ordersItems, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.hasMany(db.shoppingCarts, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.hasMany(db.wishlists, { foreignKey: { name: 'product_id', allowNull: false } });
db.products.belongsTo(db.discounts, { foreignKey: { name: 'discount_id' } });
db.products.belongsTo(db.brands, { foreignKey: { name: 'brand_id', allowNull: false } });
db.products.belongsTo(db.categories, { foreignKey: { name: 'category_id', allowNull: false } });
db.discounts.hasMany(db.products, { foreignKey: { name: 'discount_id' } });
db.brands.hasMany(db.products, { foreignKey: { name: 'brand_id', allowNull: false } });
db.categories.hasMany(db.products, { foreignKey: { name: 'category_id', allowNull: false } });
//order relations
db.orders.hasMany(db.ordersItems, { foreignKey: { name: 'order_id', allowNull: false } });
db.orders.hasOne(db.ordersRecipients, { foreignKey: { name: 'order_id', allowNull: false } });
db.ordersItems.belongsTo(db.orders, { foreignKey: { name: 'order_id', allowNull: false } });
db.ordersRecipients.belongsTo(db.orders, { foreignKey: { name: 'order_id', allowNull: false } });
// Sync the s with the database
db.sequelize.sync({ force: true })
    .then(() => {
    console.log('Database synchronization complete.');
})
    .catch((err) => {
    console.error('Error synchronizing the database:', err);
});
module.exports = db;
