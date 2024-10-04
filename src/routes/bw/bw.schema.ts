import z from 'zod'

const createBwSchema = z.object({
   customer_id: z.number(),
   manager_id: z.number(),
   start_date: z.string().date(),
   end_date: z.string().date(),
})

export type CreateBwInputType = z.infer<typeof createBwSchema>