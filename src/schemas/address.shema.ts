import { z } from 'zod';
import { addressSchema } from './register.schema';

export const addressesSchema = z.object({
  ...addressSchema,
  isShippingDefaultAddress: z.boolean().optional(),
  isBillingDefaultAddress: z.boolean().optional(),
});

export type AddressShippingFormData = z.infer<typeof addressesSchema>;
