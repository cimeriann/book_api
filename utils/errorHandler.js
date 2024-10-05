const errorResponse = async (res, statusCode, error) => {
    res.status(statusCode).send({ status: "error", error });
  };
  
  const successResponse = async (res, statusCode, message, data) => {
    res.status(statusCode).send({
      status: "success",
      message: "message",
      data
  });
  };
  
  module.exports = {
      errorResponse,
      successResponse
  }