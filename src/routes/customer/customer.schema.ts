import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const customerCore = {
  first_name: z.string(),
  last_name: z.string(),
  tel: z.string(),
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
