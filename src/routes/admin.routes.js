const express = require("express");
const { adminSignup, adminSignin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/signin", adminSignin);

module.exports = router;
