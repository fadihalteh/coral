module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return OrderItem;
};
