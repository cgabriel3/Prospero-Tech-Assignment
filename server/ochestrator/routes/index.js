const express = require("express");
const router = express.Router();

const userRoute = require("./users");
const taxRoute = require("./tax");

router.use("/users", userRoute);
router.use("/pajak", taxRoute);

module.exports = router;
