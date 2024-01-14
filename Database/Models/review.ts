module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        
        rating: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING,
        },
        date_posted: {
            type: DataTypes.STRING,
        },
    });

    return Review;
};
