import { z } from 'zod';

export const promocodeSchema = z.object({
  promocode: z.string().min(1, 'Promocode is required'),
});

export type PromocodeFormData = z.infer<typeof promocodeSchema>;
