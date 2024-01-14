const dbConfig = require('../config/dbConfig.ts');
import { Sequelize, DataTypes, Dialect } from 'sequelize';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
        define: { timestamps: false },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
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

// Import and define s
db.User = require('./user.ts')(sequelize, DataTypes);
db.Address = require('./address.ts')(sequelize, DataTypes);
db.Review = require('./review.ts')(sequelize, DataTypes);
db.Product = require('./product.ts')(sequelize, DataTypes);
// db.Wishlist = require('./wishlist.ts')(sequelize, DataTypes);
// db.WishlistItem = require('./wishlistItem.ts')(sequelize, DataTypes);
db.Category = require('./category.ts')(sequelize, DataTypes);
db.Brand = require('./brand.ts')(sequelize, DataTypes);
db.Order = require('./order.ts')(sequelize, DataTypes);
db.OrderItem = require('./orderItem.ts')(sequelize, DataTypes);
db.Discount = require('./discount.ts')(sequelize, DataTypes);
db.ProductImage = require('./productImage.ts')(sequelize, DataTypes);
// db.ShoppingCart = require('./shoppingCart.ts')(sequelize, DataTypes);
db.Session = require('./session.ts')(sequelize, DataTypes);

// User relations
db.Address.belongsTo(db.User, { foreignKey:{ name:'user_id', allowNull: false }});
db.Review.belongsTo(db.User, { foreignKey:{ name: 'user_id', allowNull: false }});
db.Session.belongsTo(db.User, { foreignKey:{ name: 'user_id', allowNull: false }});
db.Order.belongsTo(db.User, { foreignKey:{ name: 'user_id', allowNull: false }});
// db.Wishlist.belongsTo(db.User, { foreignKey:{ name: 'user_id', allowNull: false }});


db.User.hasMany(db.Address, { foreignKey:{ name:'user_id', allowNull: false }});
db.User.hasMany(db.Review, { foreignKey:{ name:'user_id', allowNull: false }});
db.User.hasMany(db.Session, { foreignKey:{ name:'user_id', allowNull: false }});
db.User.hasMany(db.Order, { foreignKey:{ name:'user_id', allowNull: false }});
// db.User.hasOne(db.Wishlist, { foreignKey:{ name:'user_id', allowNull: false }});

//product relations


db.Review.belongsTo(db.Product, { foreignKey:{ name: 'product_id', allowNull: false }});
db.ProductImage.belongsTo(db.Product, { foreignKey:{ name: 'product_id', allowNull: false }});
db.OrderItem.belongsTo(db.Product, { foreignKey:{ name: 'product_id', allowNull: false }});



db.Product.hasMany(db.ProductImage, { foreignKey:{ name: 'product_id', allowNull: false }});
db.Product.hasMany(db.Review, { foreignKey:{ name: 'product_id', allowNull: false }});
db.Product.hasMany(db.OrderItem, { foreignKey:{ name: 'product_id', allowNull: false }});


db.Product.belongsTo(db.Discount, { foreignKey:{ name: 'discount_id'}});
db.Product.belongsTo(db.Brand, { foreignKey:{ name: 'brand_id', allowNull: false }});
db.Product.belongsTo(db.Category, { foreignKey:{ name: 'category_id', allowNull: false }});


db.Discount.hasMany(db.Product, { foreignKey:{ name: 'discount_id' }});
db.Brand.hasMany(db.Product, { foreignKey:{ name: 'brand_id', allowNull: false }});
db.Category.hasMany(db.Product, { foreignKey:{ name: 'category_id', allowNull: false }});



// order relations 

// db.Wishlist.hasMany(db.WishlistItem, { foreignKey:{ name: 'wishlist_id', allowNull: false }});
// db.WishlistItem.belongsTo(db.Wishlist, { foreignKey:{ name: 'wishlist_id', allowNull: false }});
// db.WishlistItem.belongsTo(db.Product, { foreignKey:{ name: 'product_id', allowNull: false }});

db.Order.hasMany(db.OrderItem, { foreignKey:{ name: 'order_id', allowNull: false }});
db.OrderItem.belongsTo(db.Order, { foreignKey:{ name: 'order_id', allowNull: false }});

// db.ShoppingCart.belongsTo(db.User, { foreignKey:{ name: 'user_id', allowNull: false }});
// db.ShoppingCart.belongsTo(db.Product, { foreignKey:{ name: 'product_id', allowNull: false }});

// Sync the s with the database
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronization complete.');
    })
    .catch((err: any) => {
        console.error('Error synchronizing the database:', err);
    });

module.exports = db;
