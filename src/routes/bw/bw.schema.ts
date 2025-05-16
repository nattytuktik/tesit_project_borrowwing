import z from "zod";

const createBwSchema = z.object({
  customer_id: z.number(),
  manager_id: z.number(),
  start_date: z.string().date(),
  end_date: z.string().date(),
  address: z.string(),
});

export interface TEquipment {
  id: number;
  name: string;
  quantity: number;
  used: number;
  image: string;
}

export interface TReservate {
  borrowing_id: number;
  equipment: TEquipment;
  quantity: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export type CreateBwInputType = z.infer<typeof createBwSchema>;
