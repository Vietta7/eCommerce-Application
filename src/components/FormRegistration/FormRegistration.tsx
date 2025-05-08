import { useForm } from 'react-hook-form';
import { FormData, Input } from '../ui/Input/Input';
import styles from './FormRegistration.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

const countryList = ['United States', 'Russia'];

const postalCodeRegex = {
  US: /^\d{5}$/,
  RU: /^\d{6}$/,
};

const formSchema: ZodType<FormData> = z.object({
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

  dateBirthday: z.string().refine(
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

  street: z.string().min(1, 'Street is required'),
  town: z
    .string()
    .min(1, 'City is required')
    .regex(/^[A-Za-z\s'-]+$/, 'City must not contain numbers or special characters'),

  postCode: z
    .string()
    .refine((val) => postalCodeRegex.US.test(val) || postalCodeRegex.RU.test(val), {
      message: 'Invalid postal code format for US or Russia',
    }),

  country: z.string().refine((val) => countryList.includes(val), {
    message: 'Please select a valid country',
  }),
});

export function FormRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSumbit = async (data: FormData) => {
    console.log('Success', data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
      <h4 className={`${styles.header} ${styles.personal}`}>Personal information</h4>
      <Input
        className={styles.email}
        label="Email"
        name="email"
        placeholder="Email"
        type="email"
        register={register}
        error={errors.email}
        touchedFields={touchedFields}
      />
      <Input
        className={styles.password}
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password}
        touchedFields={touchedFields}
      />
      <Input
        className={styles.firstname}
        label="Firstname"
        name="firstName"
        placeholder="Firstname"
        type="text"
        register={register}
        error={errors.firstName}
        touchedFields={touchedFields}
      />
      <Input
        className={styles.lastname}
        label="Lastname"
        name="lastName"
        placeholder="Lastname"
        type="text"
        register={register}
        error={errors.lastName}
        touchedFields={touchedFields}
      />
      <Input
        className={styles.datebirthday}
        label="Datebirthday"
        name="dateBirthday"
        placeholder="Datebirthday"
        type="date"
        register={register}
        error={errors.dateBirthday}
        touchedFields={touchedFields}
      />

      <h4 className={`${styles.header} ${styles.address}`}>Address</h4>
      <Input
        className={styles.street}
        label="Street"
        name="street"
        placeholder="Street"
        type="text"
        register={register}
        error={errors.street}
        touchedFields={touchedFields}
      />

      <div className={styles.townPostcode}>
        <Input
          className={styles.town}
          label="Town"
          name="town"
          placeholder="Town"
          type="text"
          register={register}
          error={errors.town}
          touchedFields={touchedFields}
        />
        <Input
          className={styles.postcode}
          label="Postcode"
          name="postCode"
          placeholder="Postcode"
          type="text"
          register={register}
          error={errors.postCode}
          touchedFields={touchedFields}
        />
      </div>
      <Input
        className={styles.country}
        label="Country"
        name="country"
        placeholder="Country"
        type="text"
        register={register}
        error={errors.country}
        touchedFields={touchedFields}
      />

      <button type="submit" className={styles.submitBtn} disabled={!isValid}>
        Sign up
      </button>
      <p className={styles.linkToLogin}>
        Already have an account?
        <a className={styles.link} href="/login">
          Log In
        </a>
      </p>
    </form>
  );
}
