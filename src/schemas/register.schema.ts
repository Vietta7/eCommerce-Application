import { z } from 'zod';

const postalCodeRegex = {
  US: /^\d{5}$/,
  RU: /^\d{6}$/,
};

export const addressSchema = {
  streetName: z
    .string()
    .min(1, 'Street is required')
    .regex(/^[A-Za-z0-9 ]+$/, 'Use only english letters'),
  city: z
    .string()
    .min(1, 'City is required')
    .regex(/^[A-Za-z\s'-]+$/, 'City must not contain numbers or special characters'),
  postalCode: z
    .string()
    .refine((val) => postalCodeRegex.US.test(val) || postalCodeRegex.RU.test(val), {
      message: 'Invalid postal code format for US or Russia',
    }),

  country: z.string(),
};

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/\d/, 'Must include a number'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .regex(/^[A-Za-z\s'-]+$/, 'First name must not contain numbers or special characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z\s'-]+$/, 'Last name must not contain numbers or special characters'),

  dateOfBirth: z.string().refine(
    (val) => {
      const dob = new Date(val);
      if (isNaN(dob.getTime())) return false;
      const now = new Date();
      const age = now.getFullYear() - dob.getFullYear();
      const hasBirthdayPassedThisYear =
        now.getMonth() > dob.getMonth() ||
        (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
      const adjustedAge = hasBirthdayPassedThisYear ? age : age - 1;
      return adjustedAge >= 14;
    },
    {
      message: 'You must be at least 14 years old',
    },
  ),
  shippingAddress: z.object(addressSchema),
  billingAddress: z.object(addressSchema),
  isBillingSameAsShipping: z.boolean().optional(),
  isBillingDefaultAddress: z.boolean().optional(),
  isShippingDefaultAddress: z.boolean().optional(),
  defaultShippingAddress: z.number().optional(),
  defaultBillingAddress: z.number().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
