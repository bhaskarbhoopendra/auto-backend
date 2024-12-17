import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRecommendedCategoriesByBrandService, getRecommendedProductsService } from './recommended.service';

/**
 * Handles a request to fetch recommended products based on the same category.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getRecommendedProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const recommendedProducts = (await getRecommendedProductsService(productId)) as any;

    if (!recommendedProducts.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No recommended products found',
      });
    }

    return res.status(StatusCodes.OK).json(recommendedProducts);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to fetch recommended products',
      error: error.message,
    });
  }
};

/**
 * Handles a request to fetch recommended products based on the brand.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getRecommendedCategoriesByBrand = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const recommendedProducts = (await getRecommendedCategoriesByBrandService(productId)) as any;

    if (!recommendedProducts.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'No recommended products found for this brand',
      });
    }

    return res.status(StatusCodes.OK).json(recommendedProducts);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to fetch recommended products based on brand',
      error: error.message,
    });
  }
};
