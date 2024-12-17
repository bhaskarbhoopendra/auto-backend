import * as express from 'express';
import { createCategory, editCategory, deleteCategory, getOneCategory, getAllCategories } from './category.controller';

const CategoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category Management
 * /categories/create:
 *   post:
 *     summary: Create a new category with category name, image, and brand ID
 *     tags: [Category Management]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Laptops"
 *               categoryImage:
 *                 type: string
 *                 format: binary
 *               brand:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *           encoding:
 *             categoryImage:
 *               contentType:
 *                 - image/png
 *                 - image/jpeg
 *                 - image/jpg
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 data:
 *                   type: string
 *                   example: "Category ID"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 */
CategoryRouter.post('/create', createCategory);

/**
 * @swagger
 * tags:
 *   name: Category Management
 * /categories/update/{id}:
 *   put:
 *     summary: Update an existing category by ID
 *     tags: [Category Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Smartphones"
 *               categoryImage:
 *                 type: string
 *                 format: binary
 *               brand:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 data:
 *                   type: string
 *                   example: "Category ID"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 */
CategoryRouter.put('/update/:id', editCategory);

/**
 * @swagger
 * tags:
 *   name: Category Management
 * /categories/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */
CategoryRouter.delete('/delete/:id', deleteCategory);

/**
 * @swagger
 * tags:
 *   name: Category Management
 * /categories/get/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Laptops"
 *                     categoryImage:
 *                       type: string
 *                       example: "https://example.com/laptops-category-image.png"
 *                     brand:
 *                       type: string
 *                       example: "60c72b2f4f1a5b0017d7bc4f"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */
CategoryRouter.get('/get/:id', getOneCategory);

/**
 * @swagger
 * tags:
 *   name: Category Management
 * /categories:
 *   get:
 *     summary: Fetch all categories
 *     tags: [Category Management]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *                   categoryName:
 *                     type: string
 *                     example: "Laptops"
 *                   categoryImage:
 *                     type: string
 *                     example: "https://example.com/laptops-category.png"
 *                   brand:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *                   createdAt:
 *                     type: string
 *                     example: "2021-06-13T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2021-06-13T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 */
CategoryRouter.get('/', getAllCategories);

export default CategoryRouter;
