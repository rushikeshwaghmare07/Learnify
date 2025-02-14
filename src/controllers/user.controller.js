const courseModel = require("../models/course.model");
const purchaseModel = require("../models/purchase.model");
const userModel = require("../models/user.model");
const { userSignupSchema } = require("../validations/user.validation");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    // Validate the request body
    const parsedBody = userSignupSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: parsedBody.error.errors,
      });
    }

    // Extract validated data
    const { firstName, lastName, email, password } = parsedBody.data;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Create a new user
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in userSignup controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the user.",
    });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_USER,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", token, options);

    return res.status(200).json({
      success: false,
      message: "User logged in successfully.",
      user: user,
    });
  } catch (error) {
    console.log("Error in userSignup controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the user.",
    });
  }
};

const allPurchases = async (req, res) => {
  try {
    const userId = req.userId;

    const purchases = await purchaseModel.find({ userId });
    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No courses found.",
      });
    }

    const courseData = await courseModel.find({
      _id: {$in: purchases.map(x => x.courseId)}
    })

    return res.status(200).json({
      success: true,
      message: "All purchased courses retrieved successfully.",
      purchases: purchases,
      course: courseData,
    });
  } catch (error) {
    console.log("Error in userSignup controller", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while registering the user.",
    });
  }
};

module.exports = {
  userSignup,
  userSignin,
  allPurchases,
};
