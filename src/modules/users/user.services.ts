import { errorHandler, successHandler } from '../../util/response-helper';
import { CreateSuccess, InternalErrMessage } from '../../global/global.constant';
import { clientId, cognito, userPoolId } from '../../util/aws-config';
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AuthFlowType,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { IUser } from './user.interface';
import User from '../../models/user.model';
import { getCartForUserService } from '../cart/cart.service';
export const registerUser = async (userData: IUser) => {
  try {
    const { email, password, firstName, lastName } = userData;

    // Create Cognito user
    const createUserResponse = await cognito.send(
      new AdminCreateUserCommand({
        UserPoolId: userPoolId!,
        Username: email,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'email_verified', Value: 'true' },
        ],
      }),
    );

    // Extract Cognito UserId (sub)
    const userId = createUserResponse?.User?.Attributes?.find((attr) => attr.Name === 'sub')?.Value;
    if (!userId) {
      throw new Error('Failed to retrieve Cognito user ID');
    }

    // Set permanent password
    await cognito.send(
      new AdminSetUserPasswordCommand({
        UserPoolId: userPoolId!,
        Username: email,
        Password: password,
        Permanent: true,
      }),
    );

    // Prepare user data and save to DB
    const userPayload = {
      firstName,
      lastName,
      email,
      cognitoId: userId,
    };
    await User.create(userPayload);

    return successHandler(`User ${CreateSuccess}`, 'Created Successfully');
  } catch (error) {
    console.error('Error in registerUser:', error);
    return errorHandler(InternalErrMessage, error);
  }
};

export const userLogin = async (userData: any) => {
  try {
    const { email, password } = userData;
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: clientId!,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognito.send(command);
    const users:any = await User.findOne({email});
    if(!userData){
      return "No user"
    }
    const userCart = await getCartForUserService(users?._id)

    const user ={
      id: users?._id,
      firstName: users?.firstName,
      lastName: users?.lastName,
      email: users?.email,
      cart: userCart,
      wishList: users?.wishList
    }
    const tokens = {
      accessToken: response.AuthenticationResult?.AccessToken,
      refreshToken: response.AuthenticationResult?.RefreshToken,
      idToken: response.AuthenticationResult?.IdToken,
    };
    const responses ={
      tokens,
      user
    }
    return successHandler('User Login', responses);
  } catch (error) {
    console.log({ error });
    return errorHandler(InternalErrMessage, error);
  }
};

export const getUserWithCartAndWishlistService = async () => {
  const users = await User.find()
    .populate('cart') // Assuming `cart` field in User references a Cart model
    .populate('wishlist') // Assuming `wishlist` field in User references a Wishlist model
    .populate('addresses'); // If `addresses` are embedded in User, this is unnecessary

  return users;
};

/**
 * Fetch all addresses for a user
 */
export const getAddressesService = async (userId: string) => {
  const user = await User.findById(userId).select('addresses');
  if (!user) {
    throw new Error('User not found');
  }
  return user.addresses;
};

/**
 * Add a new address to a user
 */
export const addAddressService = async (userId: string, addressData: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.addresses.push(addressData);
  const updatedUser = await user.save();
  return updatedUser;
};

/**
 * Update an existing address for a user
 */
export const updateAddressService = async (userId: string, addressId: string, addressData: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const address = user.addresses.id(addressId);
  if (!address) {
    throw new Error('Address not found');
  }

  // Update address fields
  address.addressLine1 = addressData.addressLine1 || address.addressLine1;
  address.addressLine2 = addressData.addressLine2 || address.addressLine2;
  address.city = addressData.city || address.city;
  address.state = addressData.state || address.state;
  address.pincode = addressData.pincode || address.pincode;
  address.landmark = addressData.landmark || address.landmark;
  address.addressType = addressData.addressType || address.addressType;

  const updatedUser = await user.save();
  return updatedUser;
};

/**
 * Delete an address from a user
 */
export const deleteAddressService = async (userId: string, addressId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Find the index of the address in the addresses array
  const addressIndex = user.addresses.findIndex((address: any) => address._id.toString() === addressId);
  if (addressIndex === -1) {
    throw new Error('Address not found');
  }

  // Remove the address using splice
  user.addresses.splice(addressIndex, 1);

  // Save the updated user document
  const updatedUser = await user.save();
  return updatedUser;
};
