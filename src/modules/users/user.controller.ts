import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import { IResponse } from '../../interfaces/common';
import { getStatus } from '../../util/status-helper';
import {
  addAddressService,
  deleteAddressService,
  getAddressesService,
  getUserWithCartAndWishlistService,
  registerUser,
  updateAddressService,
  userLogin,
} from './user.services';
dotenv.config({ path: './.env' });

/**
 * Handles a request to create user.
 *
 * @param {Request} req - The Express request object, user details in the request parameters.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the creation operation.
 */
export const createUser = (req: Request, res: Response) => {
  const userData = req.body;
  registerUser(userData)
    .then((user: IResponse) => {
      const status = getStatus(user?.success);
      return res.status(status).send(user);
    })
    .catch((err: IResponse) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Handles a request to create user.
 *
 * @param {Request} req - The Express request object, user details in the request parameters.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<void>} A Promise representing the completion of the creation operation.
 */
export const loginUser = (req: Request, res: Response) => {
  const userData = req.body;
  userLogin(userData)
    .then((user: IResponse) => {
      const status = getStatus(user?.success);
      return res.status(status).send(user);
    })
    .catch((err: IResponse) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
};

/**
 * Controller to fetch all users' information along with their cart and wishlist.
 */
export const getUserWithCartAndWishlist = async (req: Request, res: Response) => {
  try {
    const users = await getUserWithCartAndWishlistService();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Users' information fetched successfully",
      data: users,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Unable to fetch users information',
      error: error.message,
    });
  }
};

/**
 * Fetch all addresses for a user
 */
export const getAddresses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const addresses = await getAddressesService(userId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Addresses fetched successfully',
      data: addresses,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching addresses',
      error: error.message,
    });
  }
};

/**
 * Add a new address for a user
 */
export const addAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const addressData = req.body;
    const updatedUser = await addAddressService(userId, addressData);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Address added successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error adding address',
      error: error.message,
    });
  }
};

/**
 * Update an address for a user
 */
export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, addressId } = req.params;
    const addressData = req.body;
    const updatedUser = await updateAddressService(userId, addressId, addressData);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Address updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating address',
      error: error.message,
    });
  }
};

/**
 * Delete an address for a user
 */
export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, addressId } = req.params;
    const updatedUser = await deleteAddressService(userId, addressId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Address deleted successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error deleting address',
      error: error.message,
    });
  }
};
