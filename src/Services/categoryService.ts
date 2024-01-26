import db from '../Database/Models/index';

export const getAllCategories = async () => {
    return await db.categories.findAll();
};

export const getHandpickedCategories = async () => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Personal Care', 'Handbags', 'Wrist Watches', 'Sunglasses']
            }
        }
    });
};

export const getTopCategories = async () => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Skincare', 'Jewelry', 'Handbags','Watches', 'Eye Wear']
            }
        }
    });
};

export const getMobileCategories = async () => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Skincare', 'Fragrance', 'Handbags', 'Eye Wear', 'Apparels']
            }
        }
    });
};
