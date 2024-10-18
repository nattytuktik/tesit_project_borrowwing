import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const customerCore = {
  first_name: z.string().min(2).max(50).trim(),
  last_name: z.string().min(2).max(50).trim(),
  tel: z
    .string()
    .regex(/^(?:\+66|0)[0-9]{8,9}$/, "Invalid phone number")
    .trim(), // Updated regex for Thai phone numbers
};

const createCustomerSchema = z.object({
  ...customerCore,
});

const IcreateCustomerResponseSchema = z.object({
  ...customerCore,
  id: z.number(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

const createCustomerJsonSchema = {
  $id: "createCustomerResponseSchema",
  ...zodToJsonSchema(IcreateCustomerResponseSchema),
};

export const customerSchema = [createCustomerJsonSchema];
