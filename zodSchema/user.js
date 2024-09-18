const z = require("zod");
const userSchema = z
  .object({
    name: z
      .string({ required_err: "Name is required!" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters." })
      .max(255, { message: "Name must be at most 255 characters." }), // required field
    email: z
      .string({ required_err: "Email is required!" })
      .email()
      .trim()
      .min(3, { message: "Email must be at least 3 characters." })
      .max(255, { message: "Email must be at most 255 characters." }), // required field, must be a valid email
    password: z
      .string({ required_err: "Password is required!" })
      .min(7, { message: "Password must be at least 7 characters." })
      .max(255, { message: "Password must be at most 255 characters." }), // required field, assuming minimum length for password
    confirmPassword: z
      .string({ required_err: "Password is required!" })
      .min(7, { message: "Password must be at least 7 characters." })
      .max(255, { message: "Password must be at most 255 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"], // Set the error path to confirmPassword
  });

module.exports = userSchema;
