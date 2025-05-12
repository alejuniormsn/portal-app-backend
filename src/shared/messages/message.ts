const messages = (status: number, message: unknown) => {
  return {
    success: status <= 299 ? true : false,
    statusCode: status,
    message: message,
  };
};
export default messages;
