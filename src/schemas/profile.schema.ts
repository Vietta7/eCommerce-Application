import { z } from 'zod';

export const profileSchema = z.object({
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
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine((val) => val === val.trim(), {
      message: 'Email must not have leading or trailing spaces',
    }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
