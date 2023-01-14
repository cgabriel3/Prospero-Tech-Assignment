const errorHandler = (err, req, res, next) => {
  let name = err.name;
  let code;
  let message;

  switch (name) {
    case "bad_request_login":
      code = 400;
      message = "Please insert email & password";
      break;
    case "bad_request":
      code = 400;
      message = "Please fill in the requiered fields";
      break;
    case "email_registered":
      code = 400;
      message = "Email has been registered";
      break;
    case "invalid_credentials":
      code = 401;
      message = "Invalid email or password";
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
    case "data_not_found":
      code = 404;
      message = `Cannot find data`;
      break;
    case "user_not_found":
      code = 404;
      message = `Cannot find user with id ${err.id}`;
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
