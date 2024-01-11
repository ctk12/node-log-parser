const ApiResponse = (success: boolean, message: string, data?: object | string) => {
  return data
    ? success
      ? {
          success,
          message,
          data,
        }
      : {
          success,
          message,
          error: data,
        }
    : {
        success,
        message,
      };
};

export default ApiResponse;
