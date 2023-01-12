const express = require("express");
const TaxController = require("../Controllers/taxController");
const router = express.Router();

router.get("/", TaxController.read);
router.post("/", TaxController.create);
router.patch("/:id", TaxController.update);
router.delete("/:id", TaxController.delete);

module.exports = router;
