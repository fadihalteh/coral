module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        
       
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Product;
};
