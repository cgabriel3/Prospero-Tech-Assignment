const Tax = require("../models");

class TaxController {
  static async read(req, res, next) {
    try {
      const { role } = req.user;
      const taxes = await Tax.read(role);
      res.status(200).json(taxes);
    } catch (error) {
      console.log(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const tax = await Tax.delete(id);
      if (tax.deletedCount) {
        res.status(200).json({ message: "Success delete tax" });
      } else {
        throw { message: "Tax not found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { receiptNumber } = req.body;
      console.log(req.body);
      await Tax.create({
        receiptNumber,
        createdAt: new Date(),
        status: "Created",
      });
      res.status(201).json({ message: "Success create new tax" });
    } catch (error) {
      console.log(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await User.update(id, status);
      res.status(200).json({ message: `Success update tax` });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TaxController;
