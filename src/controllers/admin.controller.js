const adminModel = require("../models/admin.model");
const courseModel = require("../models/course.model");
const { adminSignupSchema } = require("../validations/admin.validation");
const {
  courseValidationSchema,
  updateCourseValidationSchema,
} = require("../validations/course.validation");
const jwt = require("jsonwebtoken");

const adminSignup = async (req, res) => {
  try {
    const parsedBody = adminSignupSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: parsedBody.error.errors,
      });
    }

    const { firstName, lastName, email, password } = parsedBody.data;
    console.log(firstName);

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists.",
      });
    }

    const newAdmin = await adminModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully!",
      admin: newAdmin,
    });
  } catch (error) {
    console.log("Error in adminSignup controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the admin.",
    });
  }
};

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = await jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", token, options);

    return res.status(200).json({
      success: false,
      message: "Admin logged in successfully.",
      admin: admin,
    });
  } catch (error) {
    console.log("Error in adminSignup controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the admin.",
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const parsedBody = courseValidationSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: parsedBody.error.errors,
      });
    }

    const { title, description, imageUrl, price } = parsedBody.data;

    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      courseId: course._id,
    });
  } catch (error) {
    console.log("Error in createCourse controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while creating the course.",
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const adminId = req.adminId;

    // Validate request body
    const parsedBody = updateCourseValidationSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: parsedBody.error.format(),
      });
    }

    const { courseId, title, description, imageUrl, price } = parsedBody.data;

    // Find and update the course
    const course = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      { title, description, imageUrl, price },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or you're not authorized to update it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course,
    });
  } catch (error) {
    console.log("Error in updateCourse controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while updating the course.",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const adminId = req.adminId;

    const courses = await courseModel.find({ creatorId: adminId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this admin. Start by creating one!",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully retrieved ${courses.length} courses.`,
      courses,
    });
  } catch (error) {
    console.log("Error in getAllCourses controller", error);
    return res.status(500).json({
      success: false,
      message:
      error.message || "An unexpected error occurred while retrieving the courses. Please try again later.",
    });
  }
};

module.exports = {
  adminSignup,
  adminSignin,
  createCourse,
  updateCourse,
  getAllCourses,
};
