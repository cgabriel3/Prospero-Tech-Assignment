const express = require("express");
const TaxController = require("../Controllers/taxController");
const { authenticate } = require("../middlewares/authenticate");
const {
  authorizeMaker,
  authorizeChecker,
} = require("../middlewares/authorize");
const router = express.Router();

router.use(authenticate);
router.get("/", TaxController.read);
router.post("/", authorizeMaker, TaxController.create);
router.patch("/:id", authorizeChecker, TaxController.update);
router.delete("/:id", TaxController.delete);

module.exports = router;
