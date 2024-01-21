// const dbConfig = require('../config/dbConfig.ts');
import { Sequelize, DataTypes, Dialect } from 'sequelize';

// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD, {
//         host: dbConfig.HOST,
//         dialect: dbConfig.dialect as Dialect,
//         define: { timestamps: false },
//         pool: {
//             max: dbConfig.pool.max,
//             min: dbConfig.pool.min,
//         },
//     }
// );
export const sequelize = new Sequelize(
    process.env.mysql_database as string||"coral_store",
    process.env.mysql_username as string||"root",
    process.env.mysql_password||"12345678",
    {
      host: process.env.mysql_host||"localhost",
      dialect: "mysql",
      pool: {
        max: 10,
        min: 1,
      },
    }
  );
  
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

const db:any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, DataTypes);
db.addresses = require('./address')(sequelize, DataTypes);
db.reviews = require('./review')(sequelize, DataTypes);
db.products = require('./product')(sequelize, DataTypes);
db.wishlists = require('./wishlist')(sequelize, DataTypes);
db.categories = require('./category')(sequelize, DataTypes);
db.brands = require('./brand')(sequelize, DataTypes);
db.orders = require('./order')(sequelize, DataTypes);
db.ordersItems = require('./orderItem')(sequelize, DataTypes);
db.discounts = require('./discount')(sequelize, DataTypes);
db.productsImages = require('./productImage')(sequelize, DataTypes);
db.shoppingCarts = require('./shoppingCart')(sequelize, DataTypes);
db.sessions = require('./session')(sequelize, DataTypes);
// db.ordersRecipients = require('./OrderRecipient.ts')(sequelize, DataTypes);

// User relations
db.addresses.belongsTo(db.users, { foreignKey:{ name:'user_id', allowNull: false }});
db.reviews.belongsTo(db.users, { foreignKey:{ name: 'user_id', allowNull: false }});
db.sessions.belongsTo(db.users, { foreignKey:{ name: 'user_id', allowNull: false }});
db.orders.belongsTo(db.users, { foreignKey:{ name: 'user_id', allowNull: false }});
db.shoppingCarts.belongsTo(db.users, { foreignKey:{ name: 'user_id', allowNull: false }});
db.wishlists.belongsTo(db.users, { foreignKey:{ name: 'user_id', allowNull: false }});


db.users.hasMany(db.addresses, { foreignKey:{ name:'user_id', allowNull: false }});
db.users.hasMany(db.reviews, { foreignKey:{ name:'user_id', allowNull: false }});
db.users.hasMany(db.sessions, { foreignKey:{ name:'user_id', allowNull: false }});
db.users.hasMany(db.orders, { foreignKey:{ name:'user_id', allowNull: false }});
db.users.hasOne(db.shoppingCarts, { foreignKey:{ name:'user_id', allowNull: false }});
db.users.hasOne(db.wishlists, { foreignKey:{ name:'user_id', allowNull: false }});

//product relations


db.reviews.belongsTo(db.products, { foreignKey:{ name: 'product_id', allowNull: false }});
db.productsImages.belongsTo(db.products, { foreignKey:{ name: 'product_id', allowNull: false }});
db.ordersItems.belongsTo(db.products, { foreignKey:{ name: 'product_id', allowNull: false }});
db.shoppingCarts.belongsTo(db.products, { foreignKey:{ name: 'product_id', allowNull: false }});
db.wishlists.belongsTo(db.products, { foreignKey:{ name: 'product_id', allowNull: false }});



db.products.hasMany(db.productsImages, { foreignKey:{ name: 'product_id', allowNull: false }});
db.products.hasMany(db.reviews, { foreignKey:{ name: 'product_id', allowNull: false }});
db.products.hasMany(db.ordersItems, { foreignKey:{ name: 'product_id', allowNull: false }});
db.products.hasMany(db.shoppingCarts, { foreignKey:{ name: 'product_id', allowNull: false }});
db.products.hasMany(db.wishlists, { foreignKey:{ name: 'product_id', allowNull: false }});



db.products.belongsTo(db.discounts, { foreignKey:{ name: 'discount_id'}});
db.products.belongsTo(db.brands, { foreignKey:{ name: 'brand_id', allowNull: false }});
db.products.belongsTo(db.categories, { foreignKey:{ name: 'category_id', allowNull: false }});


db.discounts.hasMany(db.products, { foreignKey:{ name: 'discount_id' }});
db.brands.hasMany(db.products, { foreignKey:{ name: 'brand_id', allowNull: false }});
db.categories.hasMany(db.products, { foreignKey:{ name: 'category_id', allowNull: false }});

//order relations
db.orders.hasMany(db.ordersItems, { foreignKey:{ name: 'order_id', allowNull: false }});
db.orders.belongsTo(db.addresses, { foreignKey:{ name: 'address_id', allowNull: false }});

// db.orders.hasOne(db.ordersRecipients, { foreignKey:{ name: 'order_id', allowNull: false }});

db.ordersItems.belongsTo(db.orders, { foreignKey:{ name: 'order_id', allowNull: false }});
db.addresses.hasMany(db.orders, { foreignKey:{ name: 'address_id', allowNull: false }});

// db.ordersRecipients.belongsTo(db.orders, { foreignKey:{ name: 'order_id', allowNull: false }});


// Sync the s with the database
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronization complete.');
    })
    .catch((err: any) => {
        console.error('Error synchronizing the database:', err);
    });

module.exports = db;
