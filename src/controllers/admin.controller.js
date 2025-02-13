const adminModel = require("../models/admin.model");
const { adminSignupSchema } = require("../validations/admin.validation");
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

module.exports = {
  adminSignup,
}