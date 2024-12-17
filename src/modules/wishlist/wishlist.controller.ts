import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getWishlistService, addToWishlistService, removeFromWishlistService } from './wishlist.service';

/**
 * Handles a request to fetch the user's wishlist.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getWishlistForUser = async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the logged-in user's data.
    const wishlist = await getWishlistService(userId);

    if (!wishlist) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Wishlist not found for user',
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      wishlist,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to fetch user wishlist',
      error: error.message,
    });
  }
};

/**
 * Handles a request to add a product to the wishlist.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const addToWishlist = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const updatedWishlist = await addToWishlistService(userId, productId);
    return res.status(StatusCodes.OK).json(updatedWishlist);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to add product to wishlist',
      error: error.message,
    });
  }
};

/**
 * Handles a request to remove a product from the wishlist.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const removeFromWishlist = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const updatedWishlist = await removeFromWishlistService(userId, productId);
    return res.status(StatusCodes.OK).json(updatedWishlist);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to remove product from wishlist',
      error: error.message,
    });
  }
};
