import z from "zod";

const createEqtSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});

export type CreateEquimentInputType = z.infer<typeof createEqtSchema>;
