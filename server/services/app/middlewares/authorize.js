const authorizeMaker = async (req, res, next) => {
  try {
    if (req.user.role !== "MAKER") throw { name: "forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};
const authorizeStatus = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role !== "CHECKER" && req.user.role !== "APPROVER")
      throw { name: "forbidden" };

    if (
      req.user.role !== "CHECKER" &&
      req.body.status !== "Approved" &&
      req.body.status !== "Rejected" &&
      req.body.status
    ) {
      throw { name: "forbidden" };
    } else if (
      req.user.role !== "APPROVER" &&
      req.body.status !== "Checked" &&
      req.body.status !== "Rejected" &&
      req.body.status
    ) {
      throw { name: "forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeStatus,
  authorizeMaker,
};
