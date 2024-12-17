import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createCategoryService,
  editCategoryService,
  deleteCategoryService,
  getOneCategoryService,
  getAllCategoriesService,
} from './category.service';
import { getStatus } from '../../util/status-helper';

// Category Controllers

export const createCategory = async (req: any, res: Response) => {
  try {
    const { categoryName, brand } = req.body;
    const categoryImage = req.files?.categoryImage;

    if (!categoryName || !categoryImage || !brand) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'categoryName, categoryImage, and brand are required',
      });
    }

    const categoryData = await createCategoryService(categoryName, categoryImage, brand);
    const status = getStatus(categoryData?.success);
    return res.status(status).send(categoryData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const editCategory = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { categoryName, brand } = req.body;
    const categoryImage = req.file;

    const categoryData = await editCategoryService(id, categoryName, categoryImage, brand);
    const status = getStatus(categoryData?.success);
    return res.status(status).send(categoryData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryData = await deleteCategoryService(id);
    const status = getStatus(categoryData?.success);
    return res.status(status).send(categoryData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const getOneCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryData = await getOneCategoryService(id);
    const status = getStatus(categoryData?.success);
    return res.status(status).send(categoryData);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

/**
 * Handles a request to fetch all categories.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    return res.status(StatusCodes.OK).json(categories);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Unable to fetch categories',
    });
  }
};

// Subcategory Controllers (same structure as Category)

// export const createSubcategory = async (req: Request, res: Response) => {
//   try {
//     const { subcategoryName, brand, category } = req.body;
//     const subcategoryImage = req.files?.subcategoryImage;

//     if (!subcategoryName || !subcategoryImage || !brand || !category) {
//       return res.status(StatusCodes.BAD_REQUEST).send({
//         success: false,
//         message: 'subcategoryName, subcategoryImage, brand, and category are required',
//       });
//     }

//     const subcategoryData = await createSubcategoryService(subcategoryName, subcategoryImage, brand, category);
//     const status = getStatus(subcategoryData?.success);
//     return res.status(status).send(subcategoryData);
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
//   }
// };

// export const editSubcategory = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { subcategoryName, brand, category } = req.body;
//     const subcategoryImage = req.file;

//     const subcategoryData = await editSubcategoryService(id, subcategoryName, subcategoryImage, brand, category);
//     const status = getStatus(subcategoryData?.success);
//     return res.status(status).send(subcategoryData);
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
//   }
// };

// export const deleteSubcategory = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const subcategoryData = await deleteSubcategoryService(id);
//     const status = getStatus(subcategoryData?.success);
//     return res.status(status).send(subcategoryData);
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
//   }
// };

// export const getOneSubcategory = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const subcategoryData = await getOneSubcategoryService(id);
//     const status = getStatus(subcategoryData?.success);
//     return res.status(status).send(subcategoryData);
//   } catch (err) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
//   }
// };
