
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        session_key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiry_date: {
            type: DataTypes.DATE,
        },
    }, {
        timestamps: true,
        hooks: {
            // beforeCreate: (session) => {
            //     // Set expiry_date to 6 hours after createdAt
            //     const hoursLater = new Date(session.createdAt);
            //     hoursLater.setHours(hoursLater.getHours() + 1);
                
            //     // Format the date as a string
            //     session.expiry_date = hoursLater;
            // },
            beforeCreate: (session) => {
                // Set expiry_date to 60 minutes after createdAt
                const minutesLater = new Date(session.createdAt);
                minutesLater.setMinutes(minutesLater.getMinutes() + 1);
                
                // Format the date as a string
                session.expiry_date = minutesLater;
              },
        },
    });

    return Session;
};