const express = require("express");
const { purchaseCourse } = require("../controllers/course.controller");
const userAuth = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/purchase", userAuth, purchaseCourse);

module.exports = router;
