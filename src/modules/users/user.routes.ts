import * as express from 'express';
import {
  addAddress,
  createUser,
  deleteAddress,
  getAddresses,
  getUserWithCartAndWishlist,
  loginUser,
  updateAddress,
} from './user.controller';

const AuthRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Management
 * /users/admin/createuser:
 *   post:
 *     summary: Create a new user with first name, last name, email, and password
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "Passw0rd!"
 *     responses:
 *       200:
 *         description: User created successfully
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
 *                   example: "User created successfully"
 *                 data:
 *                   type: string
 *                   example: "User ID"
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
 *                 data:
 *                   type: object
 */
AuthRouter.post('/admin/createuser', createUser);

/**
 * @swagger
 * tags:
 *   name: User Management
 * /users/admin/login:
 *   post:
 *     summary: Log in a user with email and password
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "Passw0rd!"
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                   example: "User logged in successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4gZXhhbXBsZQ=="
 *                     idToken:
 *                       type: string
 *                       example: "eyJraWQiOiIxWVZlNTN3M..."
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
 *                   example: "Invalid email or password"
 *                 data:
 *                   type: object
 */
AuthRouter.post('/admin/login', loginUser);

/**
 * @swagger
 * /users/info:
 *   get:
 *     summary: Fetch all users' information along with their cart and wishlist
 *     tags: [User Management]
 *     responses:
 *       200:
 *         description: Users' information fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   cart:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           example: "60d0fe4f5311236168a109bb"
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                   wishlist:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           example: "60d0fe4f5311236168a109bb"
 *                         addedAt:
 *                           type: string
 *                           example: "2024-10-22T10:00:00.000Z"
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.get('/info', getUserWithCartAndWishlist);

/**
 * @swagger
 * /users/info:
 *   get:
 *     summary: Fetch all users' information along with their cart and wishlist
 *     tags: [User Management]
 *     responses:
 *       200:
 *         description: Users' information fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   cart:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           example: "60d0fe4f5311236168a109bb"
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                   wishlist:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           example: "60d0fe4f5311236168a109bb"
 *                         addedAt:
 *                           type: string
 *                           example: "2024-10-22T10:00:00.000Z"
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.get('/info', getUserWithCartAndWishlist);

/**
 * @swagger
 * /users/{userId}/addresses:
 *   get:
 *     summary: Fetch all addresses for a user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of addresses fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.get('/:userId/addresses', getAddresses);

/**
 * @swagger
 * /users/{userId}/addresses:
 *   post:
 *     summary: Add a new address for a user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine1:
 *                 type: string
 *                 example: "123 Main St"
 *               addressLine2:
 *                 type: string
 *                 example: "Apt 4B"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *               pincode:
 *                 type: string
 *                 example: "10001"
 *               landmark:
 *                 type: string
 *                 example: "Near Central Park"
 *               addressType:
 *                 type: string
 *                 example: "Home"
 *     responses:
 *       200:
 *         description: Address added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.post('/:userId/addresses', addAddress);

/**
 * @swagger
 * /users/{userId}/addresses/{addressId}:
 *   put:
 *     summary: Update an address for a user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: path
 *         name: addressId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the address to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine1:
 *                 type: string
 *                 example: "123 Main St"
 *               addressLine2:
 *                 type: string
 *                 example: "Apt 4B"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *               pincode:
 *                 type: string
 *                 example: "10001"
 *               landmark:
 *                 type: string
 *                 example: "Near Central Park"
 *               addressType:
 *                 type: string
 *                 example: "Home"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: User or address not found
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.put('/:userId/addresses/:addressId', updateAddress);

/**
 * @swagger
 * /users/{userId}/addresses/{addressId}:
 *   delete:
 *     summary: Delete an address for a user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: path
 *         name: addressId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the address to delete
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: User or address not found
 *       500:
 *         description: Internal Server Error
 */
AuthRouter.delete('/:userId/addresses/:addressId', deleteAddress);

export default AuthRouter;
