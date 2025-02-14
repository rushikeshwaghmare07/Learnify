const express = require("express");
const { adminSignup, adminSignin, createCourse } = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/admin.middleware")

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/signin", adminSignin);
router.post("/course", adminAuth, createCourse);

module.exports = router;
