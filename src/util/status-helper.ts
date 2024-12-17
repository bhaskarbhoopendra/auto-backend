import { StatusCodes } from 'http-status-codes';

export const getStatus = (truthyValue: boolean | undefined) => {
  return truthyValue === true ? StatusCodes.OK : StatusCodes.BAD_REQUEST;
};
