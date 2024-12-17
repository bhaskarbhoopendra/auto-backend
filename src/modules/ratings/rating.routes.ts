import * as express from 'express';
import { addRating, updateRating, deleteRating, getRatingsForProduct } from './rating.controller';

const RatingRouter = express.Router();

/**
 * @swagger
 * /ratings/{productId}/ratings:
 *   get:
 *     summary: Get all ratings for a product
 *     tags: [Product Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: List of ratings
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
RatingRouter.get('/:productId/ratings', getRatingsForProduct);

/**
 * @swagger
 * /ratings/{productId}/ratings:
 *   post:
 *     summary: Add a rating to a product
 *     tags: [Product Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to add the rating to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminId:
 *                 type: string
 *                 example: "admin123"
 *                 description: The ID of the admin adding the rating
 *               rating:
 *                 type: number
 *                 example: 5
 *                 description: The rating value (1 to 5)
 *               review:
 *                 type: string
 *                 example: "Excellent product!"
 *                 description: An optional review for the product
 *     responses:
 *       200:
 *         description: Rating added successfully
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
 *                   example: "Rating added successfully"
 *                 product:
 *                   type: object
 *                   description: The updated product object
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal Server Error
 */
RatingRouter.post('/:productId/ratings', addRating);

/**
 * @swagger
 * /ratings/{productId}/ratings/{ratingId}:
 *   put:
 *     summary: Update a rating
 *     tags: [Product Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: ratingId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "Good product, but needs improvements."
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating or product not found
 *       500:
 *         description: Internal Server Error
 */
RatingRouter.put('/:productId/ratings/:ratingId', updateRating);

/**
 * @swagger
 * /ratings/{productId}/ratings/{ratingId}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Product Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: ratingId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating or product not found
 *       500:
 *         description: Internal Server Error
 */
RatingRouter.delete('/:productId/ratings/:ratingId', deleteRating);

export default RatingRouter;
