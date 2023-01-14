const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/users");

class UserController {
  static async read(req, res, next) {
    try {
      const users = await User.read();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);
      if (user.deletedCount) {
        res.status(200).json({ message: "Success delete user" });
      } else {
        throw { message: "User not found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { email, password, name, role } = req.body;
      await User.create({
        email,
        password,
        name,
        role,
      });
      res.status(201).json({ message: "Success create new user" });
    } catch (error) {
      console.log(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, name, role } = req.body;
      await User.update(id, {
        email,
        password,
        name,
        role,
      });
      res.status(200).json({ message: `Success update user` });
    } catch (error) {
      console.log(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const user = await User.findOne(email);
      if (!user) {
        throw { name: "invalid_credentials" };
      }
      const compared = comparePass(password, user.password);
      if (!compared) {
        throw { name: "invalid_credentials" };
      }

      const access_token = createToken({ id: user._id, role: user.role });

      res.status(200).json({
        access_token,
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      let { id } = req.params;
      const user = await User.findByPk(id);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
