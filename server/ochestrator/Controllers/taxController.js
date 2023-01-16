const { default: axios } = require("axios");

// const userPath = "http://52.221.237.5:4001";
// const taxPath = "http://52.221.237.5:4002";

const userPath = "http://localhost:4001";
const taxPath = "http://localhost:4002";

class TaxController {
  static async read(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data: taxData, status: taxStatus } = await axios({
        method: "get",
        url: `${taxPath}/pajak`,
        headers: { access_token },
      });
      const { data: userData, status: userStatus } = await axios({
        method: "get",
        url: `${userPath}/users/userlist`,
        headers: { access_token },
      });

      if (taxStatus !== 200) res.status(taxStatus).json(taxData);
      if (userStatus !== 200) res.status(userStatus).json(userData);

      taxData.map((tax) => {
        tax.updatedBy = userData.find((user) => user._id === tax.updatedBy);
      });
      res.status(200).json(taxData);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { access_token } = req.headers;
      const { data, status } = await axios({
        method: "delete",
        url: `${taxPath}/pajak/${id}`,
        headers: { access_token },
      });
      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async create(req, res, next) {
    try {
      const { receiptNumber } = req.body;
      const { access_token } = req.headers;
      const { data, status } = await axios({
        method: "post",
        url: `${taxPath}/pajak`,
        headers: { access_token },
        data: { receiptNumber },
      });
      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { access_token } = req.headers;
      const { data, status: statusCode } = await axios({
        method: "patch",
        url: `${taxPath}/pajak/${id}`,
        headers: { access_token },
        data: { status },
      });
      res.status(statusCode).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const { access_token } = req.headers;
      const { data, status } = await axios({
        method: "get",
        url: `${taxPath}/pajak/${id}`,
        headers: { access_token },
      });

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = TaxController;
