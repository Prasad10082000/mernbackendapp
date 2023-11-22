const express = require("express");
const UserInfo = require("../controller/userController");

const router = express.Router();

router.post("/signup", UserInfo.userSignup);
router.post("/login", UserInfo.userLogin);

module.exports = router;