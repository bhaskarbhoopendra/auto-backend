import { errorHandler, successHandler } from '../../util/response-helper';
import { InternalErrMessage, CreateSuccess } from '../../global/global.constant';
import Cart from '../../models/cart.model';
import Product from '../../models/products.model';

/**
 * Service to get the cart for a user.
 *
 * @param {string} userId - User ID.
 * @returns {Promise<ICart | null>} The user's cart or null if not found.
 */
export const getCartService = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    return cart;
  } catch (error) {
    throw new Error('Unable to fetch cart');
  }
};


/**
 * Service to add a product to the user's cart.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @param {number} quantity - Quantity of the product to add.
 * @returns {Promise<ICart>} The updated cart.
 */
export const addToCartService = async (userId: string, productId: string, quantity: number) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const cartItem = cart.items.find((item: any) => item.product.toString() === productId);
    
    if (cartItem) {
      // If the product is already in the cart, increase the quantity by 1
      cartItem.quantity += 1; // or cartItem.quantity += quantity if you want the quantity to be dynamic
    } else {
      // If the product is not in the cart, add it with the specified quantity
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();
    return cart; // Return the updated cart
  } catch (error) {
    throw new Error('Unable to add product to cart');
  }
};

/**
 * Service to update the quantity of a product in the user's cart.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @param {number} quantity - New quantity of the product.
 * @returns {Promise<ICart>} The updated cart.
 */
export const updateCartItemService = async (userId: string, productId: string, quantity: number) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartItem = cart.items.find((item: any) => item.product.toString() === productId);
    if (!cartItem) {
      throw new Error('Product not found in cart');
    }

    cartItem.quantity = quantity;
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Unable to update cart item');
  }
};

/**
 * Service to remove a product from the user's cart.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @returns {Promise<ICart>} The updated cart.
 */
export const removeCartItemService = async (userId: string, productId: string) => {
  try {
    const cart = (await Cart.findOne({ user: userId })) as any;
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Unable to remove product from cart');
  }
};

/**
 * Service to remove a product from the user's cart.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @returns {Promise<ICart>} The updated cart.
 */
export const clearCartOfUser = async (userId: string) => {
  try {
    const cart = (await Cart.findOne({ user: userId })) as any;
    if (!cart) {
      throw new Error('Cart not found');
    }
    await Cart.findOneAndDelete({user: userId})
    return 'Cart Deleted';
  } catch (error) {
    throw new Error('Unable to remove product from cart');
  }
};

/**
 * Service to get the cart for a user.
 *
 * @param {string} userId - The user's ID.
 * @returns {Promise<ICart | null>} The user's cart or null if not found.
 */
export const getCartForUserService = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product'); // Assuming products are populated
    return cart;
  } catch (error) {
    return errorHandler('Unable to fetch cart', error);
  }
};
