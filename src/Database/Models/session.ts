module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        
        session_key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        expiry_date:{
            type: DataTypes.STRING,
            allowNull: false,
        },
   
    }, {
        timestamps: true,
    

    });

    return Session;
};
