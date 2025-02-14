const purchaseModel = require("../models/purchase.model");

const purchaseCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course id is required.",
      });
    }

    const existingPurchase = await purchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course.",
      });
    }

    const coursePurchase = await purchaseModel.create({
      userId,
      courseId,
    });

    return res.status(201).json({
      success: true,
      message: "You have successfully bought the course.",
      course: coursePurchase,
    });
  } catch (error) {
    console.log("Error in purchaseCourse controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while purchasing the courses. Please try again later.",
    });
  }
};

module.exports = {
  purchaseCourse,
}