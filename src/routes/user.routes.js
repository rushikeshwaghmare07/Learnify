const express = require("express");
const { userSignup, userSignin, allPurchases } = require("../controllers/user.controller");
const userAuth = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.post("/purchases", userAuth, allPurchases);

module.exports = router;
