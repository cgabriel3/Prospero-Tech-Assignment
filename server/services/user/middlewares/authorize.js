const User = require("../models/users");

const authorizeEditUser = async (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      const user = await User.findByPk(req.params.id);
      if (req.user.id.toString() !== user._id.toString())
        throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") throw { name: "forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeAdmin,
  authorizeEditUser,
};
