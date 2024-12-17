import * as express from 'express';
import { getCartForUser, addToCart, updateCartItem, removeFromCart, clearCart } from './cart.controller'; // Assuming these controller functions exist
import { verifyToken } from '../../middleware/authenticate';

const CartRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart Management
 *   description: Endpoints for managing the user's cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart Management]
 *     description: Retrieve the cart of the currently logged-in user.
 *     responses:
 *       200:
 *         description: The user's cart retrieved successfully.
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
 *                       quantity:
 *                         type: number
 *                         example: 2
 *       500:
 *         description: Internal Server Error
 */
CartRouter.post('/' ,getCartForUser);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Cart Management]
 *     description: Adds a product to the cart for the currently logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the cart
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
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
 *                       quantity:
 *                         type: number
 *                         example: 2
 *       400:
 *         description: Bad request, missing productId or quantity.
 *       500:
 *         description: Internal Server Error
 */
CartRouter.post('/add', addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart Management]
 *     description: Updates the quantity of a specific product in the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to update in the cart
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *               quantity:
 *                 type: number
 *                 description: New quantity of the product
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully.
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
 *                       quantity:
 *                         type: number
 *                         example: 3
 *       400:
 *         description: Bad request, missing productId or quantity.
 *       500:
 *         description: Internal Server Error
 */
CartRouter.put('/update', updateCartItem);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove a product from the user's cart
 *     tags: [Cart Management]
 *     description: Removes a specific product from the cart for the currently logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to remove from the cart
 *                 example: "60c72b2f4f1a5b0017d7bc4f"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
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
 *                       quantity:
 *                         type: number
 *                         example: 1
 *       400:
 *         description: Bad request, missing productId.
 *       500:
 *         description: Internal Server Error
 */
CartRouter.delete('/remove', removeFromCart);

CartRouter.delete('/clearCart', clearCart);


export default CartRouter;
