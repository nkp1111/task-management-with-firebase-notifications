const { z } = require("zod");


const objectIdValidationSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const userValidationSchema = z.object({
  name: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).optional(),
  email: z.string()
    .email("Please use a valid email address"),
  phone: z.string()
    .regex(/^\d{10}$/, "Please use a valid phone number")
    .optional(),

  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "employee"])
    .default("admin"),
  adminId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/).optional(),
});

const userUpdateValidationSchema = z.object({
  name: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }).optional(),
  phone: z.string()
    .regex(/^\d{10}$/, "Please use a valid phone number").optional(),
});


const userAuthValidationSchema = z.object({
  email: z.string().email("Please use a valid email address"),
  password: z.string(),
})


const ticketValidationSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["emergency", "request", "report"]).default("request"),
  status: z.enum(["open", "closed"]).default("open"),
});


module.exports = {
  userValidationSchema,
  objectIdValidationSchema,
  userUpdateValidationSchema,

  userAuthValidationSchema,

  ticketValidationSchema,
};
