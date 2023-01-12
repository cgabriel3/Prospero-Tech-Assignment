const authorizeMaker = async (req, res, next) => {
  try {
    // if (req.user.role !== "MAKER") throw { name: "forbidden" };
    if (req.user.role !== "ADMIN") throw { name: "forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};
const authorizeChecker = async (req, res, next) => {
  try {
    if (req.user.role !== "CHECKER") throw { name: "forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeChecker,
  authorizeMaker,
};
