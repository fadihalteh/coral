import db from '../Database/Models/index';
// const commonInclude = [
//   {
//     model: db.reviews,
//     attributes: []
//   },
//   {
//     model: db.discounts,
//     attributes: ['percentage']
//   },
//   {
//     model: db.productsImages,
//     attributes: ['image_url'],
//     limit: 1
//   },
  
// ];
// const commonAttributes = [
//   'id',
//   'name',
//   'sub_title',
//   'price',
//   'createdAt',
//   [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//   [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
// ];

// export const commonSortOptions: Record<string, any> = {
//   'price-high': [['price', 'DESC']],
//   'price-low': [['price', 'ASC']],
//   ratings: [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//   latest: [['createdAt', 'DESC']],
//   popular: [[db.sequelize.fn('COUNT', db.sequelize.col('orderitems.product_id')), 'DESC']]
// };

// const handleRequest = async (, options: ProductQueryOptions) => {
//   try {
 
//     const result = await db.products.findAll({
//       subQuery: false,
//       ...options,
//       attributes: [...commonAttributes, ...(options.attributes || [])],
//       include: [...commonInclude, ...(options.include || [])],
//       order: sortOrder
//     });

//     return({
//       totalItems: result.length,
//       totalPages: Math.ceil(result.length / pageSize),
//       currentPage: page,
//       pageSize: pageSize,
//       data: result.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
//     });
//   } catch (error) {
//     return ({ error: 'Internal Server Error' });
//   }
// };



export const getProductDetails = async (requested_id) => {
    try {
      const details = await db.products.findOne({
        attributes: [
          'id',
          'name',
          'sub_title',
          'model',
          'price',
          'stock_quantity',
          'description',
          [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'average_rating'],
          [db.sequelize.fn('COUNT', db.sequelize.col('Reviews.rating')), 'rating_count']
        ],
        include: [
          {
            model: db.reviews,
            attributes: []
          },
          {
            model: db.discounts,
            attributes: ['percentage']
          },
          {
            model: db.brands,
            attributes: ['name']
          },
          {
            model: db.categories,
            attributes: ['name']
          },
        
        ],
        where: {
          id: requested_id
        },
        group: ['id']
      });
      const reviews = await db.reviews.findAll({
        where: {
          product_id: requested_id
        },
        include:[
          {
            model: db.users,
            attributes: ['username']
          }
        ]
      });
      const images = await db.productsImages.findAll({
        where: {
          product_id: requested_id
        }
      });
      const related_products = await db.products.findAll({
        where: {
          id: {
            [db.Sequelize.Op.not]: requested_id 
          }
        },
        include: [
          {
            model: db.reviews,
            attributes: []
          },
          {
            model: db.discounts,
            attributes: ['percentage']
          },
          {
            model: db.productsImages,
            attributes: ['image_url']
          },
          {
            model: db.brands,
            attributes: ['name']
          },
          {
            model: db.categories,
            attributes: ['name'],
            where: {
              name: details.Category.name
            }
          }
        ]
      });
      return ({ details,reviews,images,related_products });
    } catch (error:any) {
        if (error.code) {
            throw { code: error.code, message: error.message };
          } else {
            throw { code: 500, message: 'Internal Server Error' };
          }
      }
  };
  