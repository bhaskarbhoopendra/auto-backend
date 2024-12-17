import * as express from 'express';
import { createPayment, createProduct, deleteProduct, filterProducts, getAllProducts, getProductById } from './product.controller';

const ProductRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Management
 * /products:
 *   get:
 *     summary: Fetch all products
 *     tags: [Product Management]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6123c8e0845f4a3a6c432fb5"
 *                   name:
 *                     type: string
 *                     example: "iPhone 13"
 *                   description:
 *                     type: string
 *                     example: "Latest Apple smartphone"
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "https://example.com/image1.jpg"
 *                   specialFeatures:
 *                     type: string
 *                     example: "5G, Dual SIM"
 *                   productInfo:
 *                     type: string
 *                     example: "Technical specifications..."
 *                   category:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *                   brand:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *       500:
 *         description: Internal Server Error
 */
ProductRouter.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Fetch product by ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6123c8e0845f4a3a6c432fb5"
 *                 name:
 *                   type: string
 *                   example: "iPhone 13"
 *                 description:
 *                   type: string
 *                   example: "Latest Apple smartphone"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/image1.jpg"
 *                 specialFeatures:
 *                   type: string
 *                   example: "5G, Dual SIM"
 *                 productInfo:
 *                   type: string
 *                   example: "Technical specifications..."
 *                 category:
 *                   type: string
 *                   example: "60c72b2f4f1a5b0017d7bc4f"
 *                 brand:
 *                   type: string
 *                   example: "60c72b2f4f1a5b0017d7bc4f"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
ProductRouter.get('/:id', getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product Management]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 13"
 *               description:
 *                 type: string
 *                 example: "Latest Apple smartphone"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               specialFeatures:
 *                 type: string
 *                 example: "5G, Dual SIM"
 *               productInfo:
 *                 type: string
 *                 example: "Technical specifications..."
 *               category:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *               brand:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *               price:
 *                 type: string
 *                 example: 120
 *               stock:
 *                 type: string
 *                 example: 100
 *     responses:
 *       200:
 *         description: Product created successfully
 *       500:
 *         description: Internal Server Error
 */
ProductRouter.post('/', createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 13"
 *               description:
 *                 type: string
 *                 example: "Updated product description"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               specialFeatures:
 *                 type: string
 *                 example: "5G, Dual SIM"
 *               productInfo:
 *                 type: string
 *                 example: "Updated product information"
 *               category:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *               brand:
 *                 type: string
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Internal Server Error
 */
// ProductRouter.put('/:id', updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Internal Server Error
 */
ProductRouter.delete('/:id', deleteProduct);


/**
 * @swagger
 * /products/filter:
 *   post:
 *     summary: Fetch products by categoryId or brandId (both optional)
 *     tags: [Product Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category to filter products by.
 *               brandId:
 *                 type: string
 *                 description: The ID of the brand to filter products by.
 *             example:
 *               categoryId: "670550b0a7f38910d6d7ffd9"
 *               brandId: "67029c5bc4402e0fd5b28b39"
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - neither categoryId nor brandId is provided.
 *       500:
 *         description: Internal Server Error
 */
ProductRouter.post('/filter', filterProducts);

ProductRouter.post('/create-payment', createPayment);

export default ProductRouter;
