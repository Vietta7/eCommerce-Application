import { ZodType, z } from 'zod';
import { FormDataLogin } from '../../types/user/formData';
import { InputArray } from '../../types/common';

export const autorisationFormSchema: ZodType<FormDataLogin> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/\d/, 'Must include a number'),
});

export const inputsData: InputArray[] = [
  {
    label: 'Email',
    type: 'email',
  },
  {
    label: 'Password',
    type: 'password',
  },
];
