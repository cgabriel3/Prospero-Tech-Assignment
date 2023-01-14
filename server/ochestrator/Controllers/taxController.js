const { default: axios } = require("axios");

const userPath = "http://localhost:4001";
const taxPath = "http://localhost:4002";

class TaxController {
  static async read(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data, status } = await axios({
        method: "get",
        url: `${taxPath}/pajak`,
        headers: { access_token },
      });
      res.status(status).json(data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { receiptNumber } = req.body;
      console.log(receiptNumber);
      const { access_token } = req.headers;
      const { data, status } = await axios({
        method: "post",
        url: `${taxPath}/pajak`,
        headers: { access_token },
        data: { receiptNumber },
      });
      res.status(status).json(data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
}

module.exports = TaxController;
