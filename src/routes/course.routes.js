const express = require("express");
const { purchaseCourse, previewCourse } = require("../controllers/course.controller");
const userAuth = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/purchase", userAuth, purchaseCourse);
router.post("/preview", previewCourse);

module.exports = router;
