import { Request, Response } from 'express';
import { getOrderItemAnalytics } from '../../Services/admin/orderService'; // Adjust the path accordingly

export const getOrderItemAnalyticsController = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate, brandId, categoryId } = req.query;

    // Validate and parse query parameters as needed

    const options = {
      status: String(status),
      startDate: startDate ? new Date(String(startDate)) : undefined,
      endDate: endDate ? new Date(String(endDate)) : undefined,
      brandId: brandId ? parseInt(String(brandId), 10) : undefined,
      categoryId: categoryId ? parseInt(String(categoryId), 10) : undefined,
    };

    const result = await getOrderItemAnalytics(options);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};