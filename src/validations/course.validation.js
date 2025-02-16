const { z } = require("zod");

const courseValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL format"),
  price: z.number().positive("Price must be a positive number")
});

const updateCourseValidationSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL format"),
  price: z.number().positive("Price must be a positive number")
});

module.exports = {
  courseValidationSchema,
  updateCourseValidationSchema
};
