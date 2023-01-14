const express = require("express");
const TaxController = require("../Controllers/taxController");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeMaker, authorizeStatus } = require("../middlewares/authorize");
const router = express.Router();

router.use(authenticate);
router.get("/", TaxController.read);
router.post("/", authorizeMaker, TaxController.create);
router.get("/:id", authorizeStatus, TaxController.findOne);
router.patch("/:id", authorizeStatus, TaxController.update);
router.delete("/:id", TaxController.delete); // for development only

module.exports = router;
