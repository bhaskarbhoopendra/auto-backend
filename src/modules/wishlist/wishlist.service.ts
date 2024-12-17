import Product from '../../models/products.model';
import Wishlist from '../../models/wishlist.model';
import { errorHandler } from '../../util/response-helper';

/**
 * Service to get the wishlist for a user.
 *
 * @param {string} userId - The user's ID.
 * @returns {Promise<IWishlist | null>} The user's wishlist or null if not found.
 */
export const getWishlistService = async (userId: string) => {
  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product'); // Assuming products are populated
    return wishlist;
  } catch (error) {
    return errorHandler('Unable to fetch wishlist', error);
  }
};

/**
 * Service to add a product to the user's wishlist.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @returns {Promise<IWishlist>} The updated wishlist.
 */
export const addToWishlistService = async (userId: string, productId: string) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const wishlistItemExists = wishlist.items.some((item: any) => item.product.toString() === productId);
    if (!wishlistItemExists) {
      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    return wishlist;
  } catch (error) {
    throw new Error('Unable to add product to wishlist');
  }
};

/**
 * Service to remove a product from the user's wishlist.
 *
 * @param {string} userId - User ID.
 * @param {string} productId - Product ID.
 * @returns {Promise<IWishlist>} The updated wishlist.
 */
export const removeFromWishlistService = async (userId: string, productId: string) => {
  try {
    const wishlist = (await Wishlist.findOne({ user: userId })) as any;
    if (!wishlist) {
      throw new Error('Wishlist not found');
    }

    wishlist.items = wishlist.items.filter((item: any) => item.product.toString() !== productId);
    await wishlist.save();
    return wishlist;
  } catch (error) {
    throw new Error('Unable to remove product from wishlist');
  }
};
