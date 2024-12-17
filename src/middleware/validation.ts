import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export default class RequestValidator {
  static validateBody = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await RequestValidator.validate(req.body, classInstance, res, next);
    };
  };

  static validateQuery = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await RequestValidator.validate(req.query, classInstance, res, next);
    };
  };

  static validateParams = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await RequestValidator.validate(req.params, classInstance, res, next);
    };
  };

  private static validate = async <T extends object>(
    value: any,
    classInstance: ClassConstructor<T>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const instance = plainToInstance(classInstance, value);
      const errors = await validate(instance);
      if (errors.length > 0) {
        const rawErrors: string[] = errors.flatMap((errorItem) => Object.values(errorItem.constraints ?? []));

        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Request validation failed!',
          errors: rawErrors,
        });
      }

      next();
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}
