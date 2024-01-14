module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount", {
      
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.STRING,
        },
        end_date: {
            type: DataTypes.STRING,
        },
        is_valid: {
            type: DataTypes.BOOLEAN,
        },
    });

    return Discount;
};
