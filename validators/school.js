const { z } = require("zod");

const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z
    .number()
    .refine((val) => Math.abs(val) <= 90, { message: "Invalid latitude" }),
  longitude: z
    .number()
    .refine((val) => Math.abs(val) <= 180, { message: "Invalid longitude" }),
});

const listSchoolsQuerySchema = z.object({
  latitude: z.coerce
    .number()
    .refine((val) => Math.abs(val) <= 90, { message: "Invalid latitude" }),
  longitude: z.coerce
    .number()
    .refine((val) => Math.abs(val) <= 180, { message: "Invalid longitude" }),
});

module.exports = {
  addSchoolSchema,
  listSchoolsQuerySchema,
};
