const { getDb } = require("../db/config");
const ObjectId = require("mongodb").ObjectId;

class Tax {
  static async getCollection() {
    try {
      const db = await getDb();
      const collection = db.collection("pajak");

      return collection;
    } catch (error) {
      console.log(error);
    }
  }
  static async read(role) {
    try {
      let query = {};
      if (role === "APPROVER") {
        query = {
          $or: [
            { status: "Rejected" },
            { status: "Checked" },
            { status: "Approved" },
          ],
        };
      } else if (role === "CHECKER") {
        query = {
          $or: [
            { status: "Rejected" },
            { status: "Created" },
            { status: "Checked" },
          ],
        };
      } else if (role === "MAKER") {
        query = { status: "Created" };
      }
      const collection = await this.getCollection();
      const taxes = await collection
        .find(query)
        .sort({ createdAt: 1 })
        .toArray();

      return taxes;
    } catch (error) {
      console.log(error);
    }
  }
  static async delete(id) {
    try {
      const collection = await this.getCollection();
      const taxes = await collection.deleteOne({ _id: ObjectId(id) });

      return taxes;
    } catch (error) {
      console.log(error);
    }
  }
  static async create(obj) {
    try {
      const collection = await this.getCollection();
      const taxes = await collection.insertOne(obj);

      return taxes;
    } catch (error) {
      console.log(error);
    }
  }
  static async update(id, userId, status) {
    try {
      const collection = await this.getCollection();

      const taxes = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { status, updatedBy: userId } }
      );

      return taxes;
    } catch (error) {
      console.log(error);
    }
  }
  static async findByPk(id) {
    try {
      const collection = await this.getCollection();
      const tax = await collection.findOne({ _id: ObjectId(id) });

      return tax;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Tax;
