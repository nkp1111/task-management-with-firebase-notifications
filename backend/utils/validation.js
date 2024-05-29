const { z } = require("zod");


const userValidationSchema = z.object({
  name: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).optional(),
  email: z.string()
    .email("Please use a valid email address"),
  phone: z.string()
    .optional()
    .regex(/^\d{10}$/, "Please use a valid phone number"),

  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "employee"])
    .default("admin"),
});

const objectIdValidationSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const userUpdateValidationSchema = z.object({
  name: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).optional(),
  phone: z.string()
    .optional()
    .regex(/^\d{10}$/, "Please use a valid phone number"),
});

module.exports = {
  userValidationSchema,
  objectIdValidationSchema,
  userUpdateValidationSchema,
};
