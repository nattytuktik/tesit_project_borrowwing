import z from "zod";

const createCustomerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  tel: z.string(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
