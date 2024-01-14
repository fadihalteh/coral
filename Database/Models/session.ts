module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        
        session: {
            type: DataTypes.STRING,
        },
    });

    return Session;
};
