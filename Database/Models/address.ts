module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
       
        country: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address_line1: {
            type: DataTypes.STRING,
        },
        address_line2: {
            type: DataTypes.STRING,
        },
        postal_code: {
            type: DataTypes.STRING,
        },
        is_default: {
            type: DataTypes.BOOLEAN,
        },
    });

    return Address;
};
