const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/users");

class UserController {
  static async read(req, res, next) {
    try {
      const users = await User.read();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);

      if (user.deletedCount) {
        res.status(200).json({ message: "Success delete user" });
      } else {
        throw { name: "user_not_found", id };
      }
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { email, password, name, role } = req.body;
      if (!email || !password || !name || !role) {
        throw { name: "bad_request" };
      }

      const user = await User.findOne(email);
      if (user) throw { name: "email_registered" };

      await User.create({
        email,
        password,
        name,
        role,
      });

      res.status(201).json({ message: "Success create new user" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, name, role } = req.body;
      if (Object.keys(req.body).length < 1) {
        throw { name: "bad_request" };
      }

      const updatedUser = await User.update(id, {
        email,
        password,
        name,
        role,
      });

      if (updatedUser.matchedCount < 1) throw { name: "user_not_found", id };
      res.status(200).json({ message: `Success update user` });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) throw { name: "bad_request_login" };

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
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      let { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) throw { name: "user_not_found", id };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async getList(req, res, next) {
    try {
      const users = await User.getList();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
