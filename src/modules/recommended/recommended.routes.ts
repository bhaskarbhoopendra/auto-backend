import * as express from 'express';
import { getRecommendedProducts, getRecommendedCategoriesByBrand } from './recommended.controller';

const RecommendationRouter = express.Router();

/**
 * @swagger
 * /recommendations/products/{productId}:
 *   get:
 *     summary: Get recommended products based on the same category
 *     tags: [Product Recommendations]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product for which recommendations are fetched
 *     responses:
 *       200:
 *         description: List of recommended products
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
 *                   name:
 *                     type: string
 *                     example: "iPhone 13"
 *                   description:
 *                     type: string
 *                     example: "Latest Apple smartphone"
 *                   category:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *                   brand:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *       404:
 *         description: No recommended products found
 *       500:
 *         description: Internal Server Error
 */
RecommendationRouter.get('/products/:productId', getRecommendedProducts);

/**
 * @swagger
 * /recommendations/categories/{productId}:
 *   get:
 *     summary: Get recommended products based on the brand
 *     tags: [Category Recommendations]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product for which category recommendations are fetched
 *     responses:
 *       200:
 *         description: List of recommended products based on brand
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
 *                   name:
 *                     type: string
 *                     example: "iPhone 13"
 *                   description:
 *                     type: string
 *                     example: "Latest Apple smartphone"
 *                   category:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *                   brand:
 *                     type: string
 *                     example: "60c72b2f4f1a5b0017d7bc4f"
 *       404:
 *         description: No recommended products found
 *       500:
 *         description: Internal Server Error
 */
RecommendationRouter.get('/categories/:productId', getRecommendedCategoriesByBrand);

export default RecommendationRouter;
