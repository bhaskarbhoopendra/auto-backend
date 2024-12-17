import { IResponse } from '../../interfaces/common';
import { errorHandler, successHandler } from '../../util/response-helper';
import { InternalErrMessage, CreateSuccess, UpdateSuccess, DeleteSuccess } from '../../global/global.constant';
import { deleteFromS3, uploadToS3 } from '../../util/s3-helper';
import Category from '../../models/category.model';
import Subcategory from '../../models/subcategory.model';

// Category Services

export const createCategoryService = async (
  categoryName: string,
  categoryImage: any,
  brand: string,
): Promise<IResponse> => {
  try {
    const s3Result = await uploadToS3(categoryImage);

    const categoryData = {
      categoryName,
      categoryImage: s3Result.fileUrl,
      brand,
    };

    const newCategory = await Category.create(categoryData);
    return successHandler(CreateSuccess, newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const editCategoryService = async (
  id: string,
  categoryName: string,
  categoryImage?: any,
  brand?: string,
): Promise<IResponse> => {
  try {
    const category = await Category.findById(id);
    if (!category) throw new Error('Category not found');

    if (categoryImage) {
      await deleteFromS3(category.categoryImage);
      const s3Result = await uploadToS3(categoryImage);
      category.categoryImage = s3Result.fileUrl;
    }

    category.categoryName = categoryName;
    category.brand = brand || category.brand;

    await category.save();
    return successHandler(UpdateSuccess, category);
  } catch (error) {
    console.error('Error editing category:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const deleteCategoryService = async (id: string): Promise<IResponse> => {
  try {
    const category = await Category.findById(id);
    if (!category) throw new Error('Category not found');

    await deleteFromS3(category.categoryImage);
    await Category.findByIdAndDelete(id);

    return successHandler(DeleteSuccess, {});
  } catch (error) {
    console.error('Error deleting category:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const getOneCategoryService = async (id: string): Promise<IResponse> => {
  try {
    const category = await Category.findById(id).populate('brand');
    if (!category) throw new Error('Category not found');

    return successHandler('Category found', category);
  } catch (error) {
    console.error('Error retrieving category:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

// Subcategory Services (same structure as Category)

export const createSubcategoryService = async (
  subcategoryName: string,
  subcategoryImage: any,
  brand: string,
  category: string,
): Promise<IResponse> => {
  try {
    const s3Result = await uploadToS3(subcategoryImage);

    const subcategoryData = {
      subcategoryName,
      subcategoryImage: s3Result.fileUrl,
      brand,
      category,
    };

    const newSubcategory = await Subcategory.create(subcategoryData);
    return successHandler(CreateSuccess, newSubcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const editSubcategoryService = async (
  id: string,
  subcategoryName: string,
  subcategoryImage?: any,
  brand?: string,
  category?: string,
): Promise<IResponse> => {
  try {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) throw new Error('Subcategory not found');

    if (subcategoryImage) {
      await deleteFromS3(subcategory.subcategoryImage);
      const s3Result = await uploadToS3(subcategoryImage);
      subcategory.subcategoryImage = s3Result.fileUrl;
    }

    subcategory.subcategoryName = subcategoryName;
    subcategory.brand = brand || subcategory.brand;
    subcategory.category = category || subcategory.category;

    await subcategory.save();
    return successHandler(UpdateSuccess, subcategory);
  } catch (error) {
    console.error('Error editing subcategory:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const deleteSubcategoryService = async (id: string): Promise<IResponse> => {
  try {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) throw new Error('Subcategory not found');

    await deleteFromS3(subcategory.subcategoryImage);
    await Subcategory.findByIdAndDelete(id);

    return successHandler(DeleteSuccess, {});
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const getOneSubcategoryService = async (id: string): Promise<IResponse> => {
  try {
    const subcategory = await Subcategory.findById(id).populate('category').populate('brand');
    if (!subcategory) throw new Error('Subcategory not found');

    return successHandler('Subcategory found', subcategory);
  } catch (error) {
    console.error('Error retrieving subcategory:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

/**
 * Service to fetch all categories.
 *
 * @returns {Promise<ICategory[]>} A list of categories.
 */
export const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find().populate('brand');
    return categories;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};
