const { default: axios } = require("axios");

const userPath = "http://52.221.237.5:4001";
const taxPath = "http://52.221.237.5:4002";

// const userPath = "http://localhost:4001";
// const taxPath = "http://localhost:4002";

class UserController {
  static async read(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data, status } = await axios.get(`${userPath}/users`, {
        headers: { access_token },
      });
      res.status(status).json(data);
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
        url: `${userPath}/users/${id}`,
        headers: { access_token },
      });

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async create(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { email, password, name, role } = req.body;
      const { data, status } = await axios({
        method: "post",
        url: `${userPath}/users`,
        headers: { access_token },
        data: { email, password, name, role },
      });

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { access_token } = req.headers;
      const { email, password, name, role } = req.body;
      const { data, status } = await axios({
        method: "put",
        url: `${userPath}/users/${id}`,
        headers: { access_token },
        data: { email, password, name, role },
      });

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const { data, status } = await axios({
        method: "post",
        url: `${userPath}/users/login`,
        data: { email, password },
      });

      res.status(status).json(data);
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
        url: `${userPath}/users/${id}`,
        headers: { access_token },
      });

      res.status(status).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = UserController;
