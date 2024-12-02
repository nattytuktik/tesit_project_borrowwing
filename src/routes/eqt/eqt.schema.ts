import z from "zod";

const createEqtSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  image: z.string(),
});

export type CreateEquimentInputType = z.infer<typeof createEqtSchema>;
