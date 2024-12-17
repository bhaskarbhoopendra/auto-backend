import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addToCartService,
  clearCartOfUser,
  getCartForUserService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from './cart.service';

/**
 * Handles a request to fetch the user's cart.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in request (authenticated)
    const cart = await getCartService(userId);
    return res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch cart',
    });
  }
};

/**
 * Handles a request to add a product to the cart.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const addToCart = async (req: any, res: Response) => {
  try {
    // const userId = req.user._id;
    const { productId, quantity, userId } = req.body;

    if (!productId || !quantity) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'Product ID and quantity are required',
      });
    }

    const updatedCart = await addToCartService(userId, productId, quantity);
    return res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to add product to cart',
    });
  }
};

/**
 * Handles a request to update the quantity of a product in the cart.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const updateCartItem = async (req: any, res: Response) => {
  try {
    const { productId, quantity, userId } = req.body;

    if (!productId || !quantity) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'Product ID and quantity are required',
      });
    }

    const updatedCart = await updateCartItemService(userId, productId, quantity);
    return res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to update cart item',
    });
  }
};

/**
 * Handles a request to remove a product from the cart.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const removeFromCart = async (req: any, res: Response) => {
  try {

    const { productId, userId } = req.body;

    if (!productId) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'Product ID is required',
      });
    }

    const updatedCart = await removeCartItemService(userId, productId);
    return res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to remove product from cart',
    });
  }
};

export const clearCart = async (req: any, res: Response) => {
  try {

    const { userId } = req.body;

    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'userId ID is required',
      });
    }

    const updatedCart = await clearCartOfUser(userId);
    return res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to remove product from cart',
    });
  }
};

/**
 * Handles a request to fetch the user's cart.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getCartForUser = async (req: any, res: Response) => {
  try {
    const userId = req.body.userId; // Assuming req.user is populated with the logged-in user's data.
    const cart = await getCartForUserService(userId);

    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Cart not found for user',
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      cart,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to fetch user cart',
      error: error.message,
    });
  }
};
