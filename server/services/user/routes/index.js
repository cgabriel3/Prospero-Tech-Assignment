const express = require("express");
const UserController = require("../Controllers/userController");
const { authenticate } = require("../middlewares/authenticate");
const {
  authorizeAdmin,
  authorizeEditUser,
} = require("../middlewares/authorize");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.post("/login", UserController.login);
router.use(authenticate);
router.get("/userlist", UserController.getList);
router.get("/", authorizeAdmin, UserController.read);
router.post("/", authorizeAdmin, UserController.create);
router.get("/:id", authorizeAdmin, UserController.findOne);
router.delete("/:id", authorizeAdmin, UserController.delete);
router.put("/:id", authorizeEditUser, UserController.update);
router.use(errorHandler);

module.exports = router;
