import { CreateSuccess, InternalErrMessage } from '../../global/global.constant';
import Product from '../../models/products.model';
import { errorHandler, successHandler } from '../../util/response-helper';
import { uploadToS3, deleteFromS3 } from '../../util/s3-helper';
import Stripe from 'stripe';

/**
 * Service to create a new product.
 *
 * @param {string} name - Product name.
 * @param {string} description - Product description.
 * @param {Express.Multer.File[]} images - Array of image files.
 * @param {string} specialFeatures - Special features of the product.
 * @param {string} productInfo - Product information.
 * @param {string} category - Category ID.
 * @param {string} brand - Brand ID.
 * @returns {Promise<IProduct>} The newly created product.
 */
export const createProductService = async (
  name: string,
  description: string,
  images: any,
  specialFeatures: string,
  productInfo: string,
  category: string,
  brand: string,
  price: number,
  stock: number
) => {
  try {
    // Upload images to S3
    const imageUploadPromises = images.map(async (image: any) => {
      const s3Result = await uploadToS3(image); // Upload each image
      return s3Result.fileUrl; // Store the S3 URL
    });

    const imageUrls = await Promise.all(imageUploadPromises); // Wait for all uploads to complete

    // Create product data with S3 image URLs
    const productData = {
      name,
      description,
      images: imageUrls, // Save S3 URLs in images field
      specialFeatures,
      productInfo,
      category,
      brand,
      price, 
      stock
    };

    // Create and save the new product
    const newProduct = await Product.create(productData);
    return successHandler(CreateSuccess, newProduct);
  } catch (error) {
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to fetch all products.
 *
 * @returns {Promise<IProduct[]>} A list of products.
 */
export const getAllProductsService = async () => {
  try {
    const products = await Product.find(); // Assuming you're using Mongoose
    return products;
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

/**
 * Service to fetch a product by ID.
 *
 * @param {string} id - Product ID.
 * @returns {Promise<IProduct | null>} The product, or null if not found.
 */
export const getProductByIdService = async (id: string) => {
  try {
    const product = await Product.findById(id); // Assuming you're using Mongoose
    return product;
  } catch (error) {
    throw new Error('Unable to fetch product');
  }
};

/**
 * Service to delete a product by ID.
 *
 * @param {string} id - Product ID.
 * @returns {Promise<void>} A promise representing the completion of the operation.
 */
export const deleteProductService = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    // If the product contains images in S3, delete them
    const imageDeletionPromises = product.images.map((imageUrl: string) => deleteFromS3(imageUrl));
    await Promise.all(imageDeletionPromises);

    await Product.findByIdAndDelete(id); // Delete the product from the database
  } catch (error) {
    throw new Error('Unable to delete product');
  }
};


/**
 * Fetch products based on categoryId or brandId (both optional).
 *
 * @param {string} categoryId - The category ID to filter by.
 * @param {string} brandId - The brand ID to filter by.
 *
 * @returns {Promise<IProduct[]>} A list of filtered products.
 */
export const filterProductsService = async (categoryId?: string, brandId?: string): Promise<any[]> => {
  const filter: any = {};

  // Add filters to query based on categoryId or brandId
  if (categoryId) {
    filter.category = categoryId;
  }
  if (brandId) {
    filter.brand = brandId;
  }

  try {
    // Fetch products from the database based on the filters
    const products = await Product.find(filter).exec();
    return products;
  } catch (err) {
    throw new Error('Error fetching products from the database.');
  }
};


const stripe = new Stripe("sk_test_51QQPLaSJVNOYVjCcyZqr7Rux4D0WJmuO1G06WaEQj8h2bkit7RXVplWqelyIjs1MQweIkBPCrsmdkiNdrrWC0BdM00uJkJdAj4", {
  apiVersion: '2024-11-20.acacia',
});

export const createPaymentIntent = async (payment_method:any, amount: number): Promise<any> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: "usd",
      payment_method,
      confirmation_method: "automatic", // for manual confirmation
      confirm: false, // Do not confirm here, we'll confirm on the client side
      description:"this is for testing purpose"
    });
    console.log({paymentIntent})
    return paymentIntent.client_secret;
  } catch (error) {
    throw new Error(`Error creating payment intent: `);
  }
};
