import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createBrandService,
  editBrandService,
  deleteBrandService,
  getOneBrandService,
  getAllBrandsService,
  getBrandsWithCategoriesService,
} from './brand.service';
import { getStatus } from '../../util/status-helper';

/**
 * Handles a request to create a brand.
 *
 * @param {Request} req - The Express request object, brand details in the request parameters.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the creation operation.
 */
export const createBrand = async (req: any, res: Response) => {
  try {
    const { brandName } = req.body;
    const brandImage = req.files?.brandImage; // Use `req.files` to access the uploaded file

    if (!brandName || !brandImage) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'brandName and brandImage are required',
      });
    }

    const brandData = await createBrandService(brandName, brandImage);
    const status = getStatus(brandData?.success);
    return res.status(status).send(brandData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

// /**
//  * Handles a request to edit a brand.
//  *
//  * @param {Request} req - The Express request object, brand details in the request parameters.
//  * @param {Response} res - The Express response object.
//  *
//  * @returns {Promise<void>} A Promise representing the completion of the edit operation.
//  */
export const editBrand = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { brandName } = req.body;
    const brandImage = req.file;

    const brandData = await editBrandService(id, brandName, brandImage);
    const status = getStatus(brandData?.success);
    return res.status(status).send(brandData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

// /**
//  * Handles a request to delete a brand.
//  *
//  * @param {Request} req - The Express request object, brand details in the request parameters.
//  * @param {Response} res - The Express response object.
//  *
//  * @returns {Promise<void>} A Promise representing the completion of the delete operation.
//  */
export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brandData = await deleteBrandService(id);
    const status = getStatus(brandData?.success);
    return res.status(status).send(brandData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

// /**
//  * Handles a request to get one brand by ID.
//  *
//  * @param {Request} req - The Express request object, brand ID in the request parameters.
//  * @param {Response} res - The Express response object.
//  *
//  * @returns {Promise<void>} A Promise representing the completion of the retrieval operation.
//  */
export const getOneBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brandData = await getOneBrandService(id);
    const status = getStatus(brandData?.success);
    return res.status(status).send(brandData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

/**
 * Handles a request to fetch all brands.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await getAllBrandsService();
    return res.status(StatusCodes.OK).json(brands);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch brands',
    });
  }
};

/**
 * Handles a request to fetch all brands with their associated categories.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getBrandsWithCategories = async (req: Request, res: Response) => {
  try {
    const {brandId} = req.body;
    const brands = await getBrandsWithCategoriesService(brandId);
    return res.status(StatusCodes.OK).json(brands);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch brands with categories',
    });
  }
};
