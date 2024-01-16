module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount", {
      
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.STRING,
        },
        expiry_date: {
            type: DataTypes.STRING,
        },
        
    },{
        timestamps: true,
    });

    return Discount;
};
