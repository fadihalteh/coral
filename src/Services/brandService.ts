import db from "../Database/Models/index";

export const getAllBrands = async () => {
  return await db.brands.findAll();
};

export const getTopBrands = async () => {
  return await db.brands.findAll({
    where: {
      name: {
        [db.Sequelize.Op.in]: [
          "Zara",
          "Prada",
          "H&M",
          "Dolce & Gabbana",
          "Chanel",
          "Biba",
        ],
      },
    },
  });
};
