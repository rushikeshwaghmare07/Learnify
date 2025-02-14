const express = require("express");
const { adminSignup, adminSignin, createCourse, updateCourse, getAllCourses } = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/admin.middleware")

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/signin", adminSignin);
router.post("/course", adminAuth, createCourse);
router.put("/course", adminAuth, updateCourse);
router.get("/course/bulk", adminAuth, getAllCourses);

module.exports = router;
