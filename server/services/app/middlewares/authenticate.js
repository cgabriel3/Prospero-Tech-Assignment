const { verifyToken } = require("../helpers/jwt");

const authenticate = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    console.log(access_token);
    if (!access_token) throw { name: "unauthorized" };

    let payload = verifyToken(access_token);
    req.user = {
      role: payload.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
