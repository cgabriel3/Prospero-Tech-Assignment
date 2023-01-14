const { verifyToken } = require("../helpers/jwt");

const authenticate = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { name: "unauthorized" };

    let payload = verifyToken(access_token);
    const roles = ["ADMIN", "APPROVER", "CHECKER", "MAKER"];
    if (roles.indexOf(payload.role) === -1) throw { name: "unauthorized" };
    req.user = {
      role: payload.role,
      _id: payload.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
