const { z } = require("zod");

const courseSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be 5 characters")
      .max(100, "Title cannot be maximum 100 characters"),

    description: z
      .string()
      .min(20, "Description must be alteast 20 characters"),
    price: z.number().min(3, "Price must be at least 3"),
    duration: z.number().positive("Duration must be a positive number"),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    published: z.boolean().optional(),
    instructor: z
      .string()
      .min(3, "Instructor name must be at least 3 characters"),
    topics: z.array(z.string()).optional(),
  }),
});

const courseIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  }),
});


const updateCourseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  }),
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title cannot be more than 100 characters")
      .optional(),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .optional(),
    price: z.number().min(3, "Price must be at least 3").optional(),
    duration: z
      .number()
      .positive("Duration must be a positive number")
      .optional(),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
    published: z.boolean().optional(),
    instructor: z
      .string()
      .min(3, "Instructor name must be at least 3 characters")
      .optional(),
    topics: z.array(z.string()).optional(),
  }),
});


module.exports = {courseIdSchema,courseSchema,updateCourseSchema};

