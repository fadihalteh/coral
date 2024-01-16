module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount", {
      
        percentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
              isFloat: true,
              min: 0,
              max: 1,
            },
          
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
