const userModel = require("../models/user.model");
const { userSignupSchema } = require("../validations/user.validation");

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

module.exports = {
  userSignup,
};
