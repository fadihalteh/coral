import { Op, Sequelize } from 'sequelize';
import db from '../../Database/Models/index';

interface OrderItemAnalyticsOptions {
  status: string; // 'completed', 'cancelled', 'processing'
  startDate?: Date;
  endDate?: Date;
  brandId?: number;
  categoryId?: number;
}

export const getOrderItemAnalytics = async (options: OrderItemAnalyticsOptions) => {
  try {
    const { status, startDate, endDate, brandId, categoryId } = options;

    const result = await db.orders.findAll({
      attributes: [
        [Sequelize.col('OrderItems.product_id'), 'product_id'],
        [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'total_quantity'],
        [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
        [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_amount'],
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              '`OrderItems`.`price` * `OrderItems`.`quantity` * (1 - `OrderItems`.`Product`.`Discount`.`percentage` / 100)'
            )
          ),
          'discounted_amount',
        ]
      ],
      include: [
        {
          model: db.ordersItems,
          as: 'OrderItems',
          attributes: [],
          include: [
            {
              model: db.products,
              as: 'Product',
              attributes: [],
            
                  where: brandId ? { brand_id: brandId } : {},
                  include: [
                    {
                      model: db.brands,
                      as: 'Brand',
                      attributes: ['name'],
                      // where: brandId ? { id: brandId } : {},
                    },
                    {
                      model: db.discounts,
                      as: 'Discount',
                      attributes: [],
                    }
                  ]
            },
            
              ],
            },
          ],

      where: {
        status,
      },
      group: ['OrderItems.product_id'],
      order: [[Sequelize.literal('total_quantity'), 'DESC']],
      raw: true,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};
