import * as express from 'express';
import { getWishlistForUser, addToWishlist, removeFromWishlist } from './wishlist.controller';

const WishlistRouter = express.Router();

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist Management]
 *     description: Retrieve the wishlist of the currently logged-in user.
 *     responses:
 *       200:
 *         description: The user's wishlist retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   example: "60c72b2f4f1a5b0017d7bc4f"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                         example: "60c72b2f4f1a5b0017d7bc4f"
 *       500:
 *         description: Internal Server Error
 */
WishlistRouter.get('/', getWishlistForUser);

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist Management]
 *     description: Adds a product to the wishlist for the currently logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the wishlist
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully.
 *       400:
 *         description: Bad request, missing productId.
 *       500:
 *         description: Internal Server Error
 */
WishlistRouter.post('/add', addToWishlist);

/**
 * @swagger
 * /wishlist/remove:
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist Management]
 *     description: Removes a specific product from the wishlist for the currently logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to remove from the wishlist
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully.
 *       400:
 *         description: Bad request, missing productId.
 *       500:
 *         description: Internal Server Error
 */
WishlistRouter.delete('/remove', removeFromWishlist);

export default WishlistRouter;
