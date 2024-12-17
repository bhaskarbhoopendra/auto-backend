import Product, { IRating } from '../../models/products.model';

/**
 * Service to add a rating to a product.
 *
 * @param {string} productId - The ID of the product.
 * @param {IRating} ratingData - The rating data including adminId, rating, and optional review.
 * @returns {Promise<IProduct>} The updated product with the new rating.
 */
export const addRatingService = async (productId: string, ratingData: IRating) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Add the new rating
  product.ratings.push(ratingData);

  // Save the updated product
  const updatedProduct = await product.save();
  return updatedProduct;
};

/**
 * Service to update a rating for a product.
 *
 * @param {string} productId - The ID of the product.
 * @param {string} ratingId - The ID of the rating to update.
 * @param {Partial<IRating>} ratingData - The new rating data (rating, review).
 * @returns {Promise<IProduct>} The updated product with the modified rating.
 */
export const updateRatingService = async (
  productId: string,
  ratingId: string,
  ratingData: { rating?: number; review?: string },
) => {
  // Validate rating data
  if (!ratingData.rating && !ratingData.review) {
    throw new Error('No rating or review provided for update');
  }

  // Validate the rating value if provided
  if (ratingData.rating !== undefined && (ratingData.rating < 1 || ratingData.rating > 5)) {
    throw new Error('Rating must be between 1 and 5');
  }

  // Use findOneAndUpdate to update the rating directly in the database
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, 'ratings._id': ratingId }, // Find the product and the specific rating by its _id
    {
      $set: {
        'ratings.$.rating': ratingData.rating, // Update the rating (if provided)
        'ratings.$.review': ratingData.review, // Update the review (if provided)
      },
    },
    { new: true, runValidators: true }, // Return the updated product and ensure validation is run
  );

  // If no product or rating is found, throw an error
  if (!updatedProduct) {
    throw new Error('Product or rating not found');
  }

  return updatedProduct;
};

/**
 * Service to delete a rating from a product.
 *
 * @param {string} productId - The ID of the product.
 * @param {string} ratingId - The ID of the rating to delete.
 * @returns {Promise<IProduct>} The updated product after the rating has been removed.
 */
export const deleteRatingService = async (productId: string, ratingId: string) => {
  // Use findOneAndUpdate with $pull to remove the rating from the array
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId }, // Find the product by its ID
    {
      $pull: { ratings: { _id: ratingId } }, // Pull the rating with the specified ratingId from the ratings array
    },
    { new: true }, // Return the updated product after the modification
  );

  // If the product is not found or the rating was not found in the array
  if (!updatedProduct) {
    throw new Error('Product or rating not found');
  }

  return updatedProduct;
};

/**
 * Service to fetch all ratings for a product.
 *
 * @param {string} productId - The ID of the product.
 * @returns {Promise<IRating[]>} The list of ratings for the product.
 */
export const getRatingsForProductService = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  return product.ratings;
};
