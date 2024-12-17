import * as express from 'express';
import {
  createBrand,
  deleteBrand,
  editBrand,
  getAllBrands,
  getBrandsWithCategories,
  getOneBrand,
} from './brand.controller';

const BrandRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands/create:
 *   post:
 *     summary: Create a new brand with brand name and image
 *     tags: [Brand Management]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Nike"
 *               brandImage:
 *                 type: string
 *                 format: binary
 *           encoding:
 *             brandImage:
 *               contentType:
 *                 - image/png
 *                 - image/jpeg
 *                 - image/jpg
 *     responses:
 *       200:
 *         description: Brand created successfully
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
 *                   example: "Brand created successfully"
 *                 data:
 *                   type: string
 *                   example: "Brand ID"
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
BrandRouter.post('/create', createBrand);

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands/update/{id}:
 *   put:
 *     summary: Update an existing brand by ID
 *     tags: [Brand Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Adidas"
 *               brandImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
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
 *                   example: "Brand updated successfully"
 *                 data:
 *                   type: string
 *                   example: "Brand ID"
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
BrandRouter.put('/update/:id', editBrand);

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands/delete/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brand Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
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
 *                   example: "Brand deleted successfully"
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
BrandRouter.delete('/delete/:id', deleteBrand);

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands/get/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brand Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand retrieved successfully
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
 *                   example: "Brand retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     brandName:
 *                       type: string
 *                       example: "Nike"
 *                     brandImage:
 *                       type: string
 *                       example: "https://example.com/nike-logo.png"
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
 *                   example: "Brand not found"
 */
BrandRouter.get('/get/:id', getOneBrand);

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands:
 *   get:
 *     summary: Fetch all brands
 *     tags: [Brand Management]
 *     responses:
 *       200:
 *         description: List of all brands
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
 *                   brandName:
 *                     type: string
 *                     example: "Nike"
 *                   brandImage:
 *                     type: string
 *                     example: "https://example.com/nike-logo.png"
 *                   createdAt:
 *                     type: string
 *                     example: "2021-06-13T12:34:56.789Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2021-06-13T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 */
BrandRouter.get('/', getAllBrands);

/**
 * @swagger
 * tags:
 *   name: Brand Management
 * /brands/with-categories:
 *   post:
 *     summary: Fetch a brand with its associated categories by brandId
 *     tags: [Brand Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: string
 *                 description: The ID of the brand to fetch
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Brand with its associated categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f4f1a5b0017d7bc4f"
 *                 brandName:
 *                   type: string
 *                   example: "Nike"
 *                 brandImage:
 *                   type: string
 *                   example: "https://example.com/nike-logo.png"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6123c8e0845f4a3a6c432fb5"
 *                       categoryName:
 *                         type: string
 *                         example: "Running Shoes"
 *                       categoryImage:
 *                         type: string
 *                         example: "https://example.com/category-shoes.png"
 *                       brand:
 *                         type: string
 *                         example: "60c72b2f4f1a5b0017d7bc4f"
 *       400:
 *         description: Invalid brandId provided
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */
BrandRouter.post('/with-categories', getBrandsWithCategories);

export default BrandRouter;
