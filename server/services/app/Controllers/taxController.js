const Tax = require("../models");

class TaxController {
  static async read(req, res, next) {
    try {
      const { role } = req.user;
      const taxes = await Tax.read(role);

      res.status(200).json(taxes);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const tax = await Tax.delete(id);

      if (tax.deletedCount) {
        res.status(200).json({ message: "Success delete tax" });
      } else {
        throw { name: "tax_not_found", id };
      }
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { receiptNumber } = req.body;
      if (!receiptNumber) throw { name: "bad_request" };
      const { _id } = req.user;

      const tax = await Tax.findOne(receiptNumber);
      if (tax) throw { name: "tax_registered" };

      await Tax.create({
        receiptNumber,
        createdAt: new Date(),
        status: "Created",
        updatedBy: _id,
      });

      res.status(201).json({ message: "Success create new tax" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      const { status } = req.body;
      if (!status || !id) throw { name: "bad_request" };

      const updatedTax = await Tax.update(id, _id, status);
      if (updatedTax.matchedCount < 1) throw { name: "tax_not_found", id };

      res.status(200).json({ message: `Success update tax` });
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      let { id } = req.params;
      const tax = await Tax.findByPk(id);

      if (!tax) throw { name: "tax_not_found", id };

      res.status(200).json(tax);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaxController;
