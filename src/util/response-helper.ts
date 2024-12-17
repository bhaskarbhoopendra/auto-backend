export const successHandler = (message: string, data: any) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorHandler = (message: string, data: any) => {
  return {
    success: false,
    message,
    data,
  };
};
