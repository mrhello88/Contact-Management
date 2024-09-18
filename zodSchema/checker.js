const { z } = require("zod");

const checkerSchema = z.object({
  name: z
    .string({ required_err: "Name is required!" })
    .min(3, { message: "Name must be at least 3 characters." })
    .max(16, { message: "Name must be at most 16 characters." })
    .trim(),

  mobile: z
    .string({ message: "Mobile is required" })
    .regex(/^(\d{11})$/, { message: "Mobile number must be exactly 11 digits" })
    .trim(),

  shopName: z
    .string({ required_err: "Shop Name is required!" })
    .min(3, { message: "Shop Name must be at least 3 characters." })
    .max(255, { message: "Shop Name must be at most 255 characters." })
    .trim(),

  province: z.enum(
    [
      "Punjab",
      "Sindh",
      "KhyberPakhtunkhwa",
      "Balochistan",
      "Islamabad",
      "GilgitBaltistan",
      "AzadJammuAndKashmir",
    ],
    {
      required_error: "Province is required",
      invalid_type_error: "Invalid province selected",
    }
  ),

  district: z.string({ message: "District is required" }).trim(),
});

module.exports = checkerSchema;
