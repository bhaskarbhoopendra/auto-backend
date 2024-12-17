import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addRatingService,
  updateRatingService,
  deleteRatingService,
  getRatingsForProductService,
} from './rating.service';

/**
 * Handles adding a rating to a product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const addRating = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Admin ID and rating are required',
      });
    }

    const updatedProduct = await addRatingService(productId, { user, rating, comment });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Rating added successfully',
      product: updatedProduct,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Handles updating a rating for a product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const updateRating = async (req: Request, res: Response) => {
  try {
    const { productId, ratingId } = req.params;
    const { rating, review } = req.body;

    const updatedProduct = await updateRatingService(productId, ratingId, { rating, review });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Rating updated successfully',
      product: updatedProduct,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Handles deleting a rating from a product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { productId, ratingId } = req.params;

    const updatedProduct = await deleteRatingService(productId, ratingId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Rating deleted successfully',
      product: updatedProduct,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Handles fetching all ratings for a product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const getRatingsForProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const productRatings = await getRatingsForProductService(productId);
    return res.status(StatusCodes.OK).json({
      success: true,
      ratings: productRatings,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
