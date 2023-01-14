const errorHandler = (err, req, res, next) => {
  let name = err.name;
  let code;
  let message;

  switch (name) {
    case "bad_request":
      code = 400;
      message = "Please fill in the the receipt number";
      break;
    case "tax_registered":
      code = 400;
      message = "Receipt number has been registered";
      break;
    case "unauthorized":
    case "JsonWebTokenError":
      code = 401;
      message = "Please login first";
      break;
    case "forbidden":
      code = 403;
      message = "You are not authorized to perform this action!";
      break;
    case "tax_not_found":
      code = 404;
      message = `Cannot find data with id ${err.id}`;
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
