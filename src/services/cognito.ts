import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {
  AuthFlowType,
  InitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AdminGetUserCommand,
  AdminDeleteUserCommand,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { clientId, cognito, userPoolId } from '../util/aws-config';
import logger from '../util/logger';

/**
 * Initiates user authentication with Amazon Cognito using the provided username and password.
 * @param {string} username - The username or email of the user.
 * @param {string} password - The user's password for authentication.
 * @returns {Promise<object>} A Promise that resolves to an authentication token.
 */
export const initiateAuth = async (username: string, password: string) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  });

  const cognitoUser = await cognito.send(command);
  return getAuthenticationToken(cognitoUser);
};

/**
 * Extracts authentication tokens from a Cognito user authentication result.
 * @param {any} cognitoUser - The Cognito user authentication result containing tokens.
 * @returns {object} An object containing the extracted authentication tokens.
 */
export const getAuthenticationToken = (cognitoUser: any) => {
  // extract tokens
  const accessToken = cognitoUser.AuthenticationResult.AccessToken;
  const refreshToken = cognitoUser.AuthenticationResult.RefreshToken;
  const idToken = cognitoUser.AuthenticationResult.IdToken;
  const expiresIn = cognitoUser.AuthenticationResult.ExpiresIn;

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    idToken: idToken,
    expiresIn: expiresIn,
  };
};

/**
 * Refreshes an access token using a refresh token with Amazon Cognito.
 * @param {string} requestRefreshToken - The refresh token used to obtain a new access token.
 * @returns {Promise<object>} A Promise that resolves to an authentication token.
 */
export const refreshTokenResult = async (requestRefreshToken: string) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: requestRefreshToken,
    },
  });

  const cognitoUser = await cognito.send(command);
  return getAuthenticationToken(cognitoUser);
};

export const verifyTokenCognito = async (token: any) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: userPoolId!,
    tokenUse: 'access',
    clientId: clientId!,
  });
  const payload = await verifier.verify(token?.toString());
  return payload;
};

/**
 * Updates the user's password in Amazon Cognito for a given email address.
 * @param {string} email - The email address of the user whose password is to be updated.
 * @param {string} password - The new password to set for the user.
 * @returns {Promise<void>} A Promise representing the completion of the password update process.
 */
export const passwordUpdateCognito = async (email: string, password: string) => {
  const params = {
    Username: email,
    Password: password,
    Permanent: true,
    UserPoolId: userPoolId,
  };
  const command = new AdminSetUserPasswordCommand(params);
  await cognito.send(command);
};

/**
 * Retrieves user information from a Cognito user pool based on the user's email.
 * @param {string} email - The email of the user whose information is to be retrieved.
 * @returns {Promise} A promise that resolves with the user data or rejects with an error if retrieval fails.
 */
export const getUserCognito = async (email: string) => {
  const params = {
    UserPoolId: userPoolId!,
    Username: email,
  };
  const command = new AdminGetUserCommand(params);
  const userData = cognito
    .send(command)
    .then((data: object) => {
      return data;
    })
    .catch((err) => {
      logger.error('Error retrieving user information:', err);
    });
  return userData;
};

/**
 * Deletes a user from the Cognito user pool based on their email.
 * @param {string} email - The email of the user to be deleted from Cognito.
 * @returns {Promise} A promise that resolves when the user is successfully deleted, or rejects with an error if deletion fails.
 */
export const deleteUserFromCognito = async (email: string) => {
  const params = {
    UserPoolId: userPoolId!,
    Username: email,
  };
  const deleteUserCommand = new AdminDeleteUserCommand(params);

  return await cognito.send(deleteUserCommand);
};

/**
 * Updates a user's email in a Cognito user pool.
 * @param {string} oldemail - The current email of the user to update.
 * @param {string} email - The new email to set for the user.
 * @returns {Promise} A promise that resolves when the email is updated, or rejects with an error if the update fails.
 */
export const updateUserEmail = async (oldemail: string, email: string) => {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: userPoolId!,
    Username: oldemail,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  });
  return await cognito.send(command);
};

export const getUserCognitoByEmailPoolId = async (email: string, poolId: string) => {
  const params = {
    UserPoolId: poolId,
    Username: email,
  };
  const command = new AdminGetUserCommand(params);
  const userData = cognito
    .send(command)
    .then((data: object) => {
      return data;
    })
    .catch((err) => {
      logger.error('Error retrieving user information:', err);
    });
  return userData;
};

export const deleteUserFromCognitoByEmailPoolId = async (email: string, poolId: string) => {
  const params = {
    UserPoolId: poolId,
    Username: email,
  };
  const deleteUserCommand = new AdminDeleteUserCommand(params);

  return await cognito.send(deleteUserCommand);
};

export const updateUserEmailByPoolId = async (oldemail: string, email: string, poolId: string) => {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: poolId,
    Username: oldemail,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  });
  return await cognito.send(command);
};
