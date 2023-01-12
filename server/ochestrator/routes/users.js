const express = require("express");
const UserController = require("../Controllers/userController");
const router = express.Router();

router.post("/login", UserController.login);
router.get("/", UserController.read);
router.post("/", UserController.create);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
