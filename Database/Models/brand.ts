module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
       
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
        },
    });

    return Brand;
};
