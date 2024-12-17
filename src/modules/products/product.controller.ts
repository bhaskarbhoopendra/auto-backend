import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createPaymentIntent,
  createProductService,
  deleteProductService,
  filterProductsService,
  getAllProductsService,
  getProductByIdService,
} from './product.service';
import Product from '../../models/products.model';

/**
 * Handles a request to fetch all products.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch products',
    });
  }
};

/**
 * Handles a request to fetch a product by ID.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(StatusCodes.OK).json(product);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch product',
    });
  }
};

/**
 * Handles a request to create a new product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const createProduct = async (req: any, res: Response) => {
  try {
    const {
      name,
      description,
      specialFeatures,
      productInfo,
      price,
      stock,
      brandInfo,
      category,
      brand,
    } = req.body;
    const images = req.files?.images; // Assuming images are uploaded as an array

    if (!name || !description || !images || !specialFeatures || !productInfo || !category || !brand) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'All product fields are required',
      });
    }

    const productData = await createProductService(
      name,
      description,
      images,
      specialFeatures,
      productInfo,
      category,
      brand,
      price,
      stock
    );
    return res.status(StatusCodes.OK).json(productData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to create product',
    });
  }
};

/**
 * Handles a request to update an existing product.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
// export const updateProduct = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, description, specialFeatures, productInfo, category, brand } = req.body;
//     const images = req.files?.images; // Assuming images are uploaded as an array

//     const updatedProductData = await updateProductService(id, name, description, images, specialFeatures, productInfo, category, brand);
//     return res.status(StatusCodes.OK).json(updatedProductData);
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//       success: false,
//       message: 'Unable to update product',
//     });
//   }
// };

/**
 * Handles a request to delete a product by ID.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteProductService(id);
    return res.status(StatusCodes.OK).send({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to delete product',
    });
  }
};



/**
 * Handles a request to filter products by categoryId or brandId.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId, brandId } = req.body;
    console.log({categoryId, brandId})
    // Ensure at least one filter is provided
    if (!categoryId && !brandId) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'At least one of categoryId or brandId must be provided.',
      });
    }

    // Call service function to get filtered products
    const products = await filterProductsService(categoryId, brandId);

    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch products',
    });
  }
};


export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const { payment_method, amount } = req.body;
  console.log({payment_method, amount})
  try {
    if (!amount || amount <= 0) {
      res.status(400).send({ error: 'Invalid amount.' });
      return;
    }

    const clientSecret = await createPaymentIntent(payment_method, amount);

    res.status(200).send({ clientSecret });
  } catch (error) {
    res.status(500).send({ error: "failed" });
  }
};