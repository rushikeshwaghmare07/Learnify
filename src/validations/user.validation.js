const { z } = require("zod");

const userSignupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must have at least 2 characters")
    .max(20, "First name must be at most 20 characters"),
  lastName: z
    .string()
    .min(2, "Last name must have at least 2 characters")
    .max(20, "Last name must be at most 20 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .max(50, "Email cannot exceed 50 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

module.exports = {
  userSignupSchema,
};
