import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import dotenv from 'dotenv';

dotenv.config();
export const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY!,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY!,
  },
});

export const userPoolId = process.env.USER_POOL_ID!;
export const clientId = process.env.POOL_CLIENT_ID!;
