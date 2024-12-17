import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Request, Response, NextFunction } from 'express';
import { userPoolId, clientId } from '../util/aws-config';
import logger from '../util/logger';
import { getUserCognitoByEmailPoolId } from '../services/cognito';
import User from '../models/user.model';

export interface RequestWithUser extends Request {
  user: any;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req) ?? '';
  const verifier = CognitoJwtVerifier.create({
    userPoolId: userPoolId!,
    tokenUse: 'access',
    clientId: clientId!,
  });

  verifier
    .verify(token?.toString())
    .then((payload) => {
      if (!payload) {
        return res.status(401).send({ statusCode: 401, data: { message: 'Unauthorized Access' } });
      }
      res.locals.username = payload.username;
      const userId = payload.sub;
      getUserCognitoByEmailPoolId(userId, userPoolId!)
        .then((cogitoUser: any) => {
          const adminEmailAttribute = cogitoUser.UserAttributes.find((attr: any) => attr.Name === 'email');
          const adminEmail = adminEmailAttribute ? adminEmailAttribute.Value : null;
          return User.find({ email: adminEmail }, { _id: 1 });
        })
        .then((userList: any) => {
          if (!userList.length) {
            throw new Error('Admin not found for the provided email.');
          }
          const userId = userList[0].id; // Extracting the ID from the first object in the array
          (req as any).userId = userId;
          next();
        })
        .catch((error: any) => {
          logger.error('Error while processing token verification:', error);
          res.status(401).send({ statusCode: 401, data: { message: 'Unauthorized Access' } });
        });
    })
    .catch((error) => {
      logger.error('Token verification error:', error);
      res.status(401).send({ statusCode: 401, data: { message: 'Unauthorized Access' } });
    });
};

export const extractToken = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query?.token) {
    return req.query.token;
  }
  return null;
};
