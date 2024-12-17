import { errorHandler, successHandler } from '../../util/response-helper';
import { InternalErrMessage, CreateSuccess, UpdateSuccess, DeleteSuccess } from '../../global/global.constant';

import { IResponse } from '../../interfaces/common';
import { deleteFromS3, uploadToS3 } from '../../util/s3-helper';
import Brand from '../../models/brand.model';
import Category from '../../models/category.model';

/**
 * Service to create a new brand.
 *
 * @param {string} brandName - Name of the brand.
 * @param {Express.Multer.File} brandImage - Brand image file from form-data.
 *
 * @returns {Promise<IResponse>} A response object with status and data.
 */
export const createBrandService = async (brandName: string, brandImage: any): Promise<IResponse> => {
  try {
    const s3Result = await uploadToS3(brandImage);

    const brandData = {
      brandName,
      brandImage: s3Result.fileUrl, // S3 URL for the image
    };

    const newBrand = await Brand.create(brandData);
    return successHandler(CreateSuccess, newBrand);
  } catch (error) {
    console.error('Error creating brand:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to edit an existing brand.
 *
 * @param {string} id - Brand ID.
 * @param {string} brandName - Updated name of the brand.
 * @param {Express.Multer.File} brandImage - Updated brand image file.
 *
 * @returns {Promise<IResponse>} A response object with status and data.
 */
export const editBrandService = async (id: string, brandName: string, brandImage?: any): Promise<IResponse> => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Brand not found');

    if (brandImage) {
      // Delete the old image from S3
      await deleteFromS3(brand.brandImage);

      // Upload the new image to S3
      const s3Result = await uploadToS3(brandImage);
      brand.brandImage = s3Result.fileUrl; // Update S3 URL
    }

    brand.brandName = brandName;
    await brand.save();

    return successHandler(UpdateSuccess, brand);
  } catch (error) {
    console.error('Error editing brand:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to delete a brand.
 *
 * @param {string} id - Brand ID.
 *
 * @returns {Promise<IResponse>} A response object with status and data.
 */
export const deleteBrandService = async (id: string): Promise<IResponse> => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Brand not found');

    // Delete image from S3
    await deleteFromS3(brand.brandImage);

    await Brand.findByIdAndDelete(id);
    return successHandler(DeleteSuccess, {});
  } catch (error) {
    console.error('Error deleting brand:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to get one brand by ID.
 *
 * @param {string} id - Brand ID.
 *
 * @returns {Promise<IResponse>} A response object with status and data.
 */
export const getOneBrandService = async (id: string): Promise<IResponse> => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Brand not found');

    return successHandler('Brand found', brand);
  } catch (error) {
    console.error('Error retrieving brand:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to fetch all brands.
 *
 * @returns {Promise<IBrand[]>} A list of brands.
 */
export const getAllBrandsService = async () => {
  try {
    const brands = await Brand.find();
    return brands;
  } catch (error) {
    throw new Error('Error fetching brands');
  }
};

/**
 * Service to fetch all brands with their associated categories.
 *
 * @returns {Promise<IBrand[]>} A list of brands, each with their associated categories.
 */
export const getBrandsWithCategoriesService = async (brandId: any) => {
  try {  
        const categories = await Category.find({ brand: brandId }); // Find categories by brand ID
        return {
          categories, // Add the associated categories to each brand
        };
  } catch (error) {
    throw new Error('Error fetching brands with categories');
  }
};
