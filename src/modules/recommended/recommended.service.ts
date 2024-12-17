import Product from '../../models/products.model';
import { errorHandler } from '../../util/response-helper';

/**
 * Service to fetch recommended products based on the same category.
 *
 * @param {string} productId - The ID of the product for which recommendations are fetched.
 * @returns {Promise<IProduct[]>} A list of recommended products.
 */
export const getRecommendedProductsService = async (productId: string) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const recommendedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude the original product from recommendations
    }).limit(5); // Assuming you want to limit the number of recommendations

    return recommendedProducts;
  } catch (error) {
    return errorHandler('Unable to fetch recommended products', error);
  }
};

/**
 * Service to fetch recommended products based on the brand.
 *
 * @param {string} productId - The ID of the product for which brand-based recommendations are fetched.
 * @returns {Promise<IProduct[]>} A list of recommended products.
 */
export const getRecommendedCategoriesByBrandService = async (productId: string) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const recommendedProducts = await Product.find({
      brand: product.brand,
      category: product.category,
      _id: { $ne: product._id }, // Exclude the original product from recommendations
    }).limit(5); // Assuming you want to limit the number of recommendations

    return recommendedProducts;
  } catch (error) {
    return errorHandler('Unable to fetch recommended products based on brand', error);
  }
};
