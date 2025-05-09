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
  addresses: z.object({
    streetName: z.string().min(1, 'Street is required'),
    city: z
      .string()
      .min(1, 'City is required')
      .regex(/^[A-Za-z\s'-]+$/, 'City must not contain numbers or special characters'),

    postalCode: z
      .string()
      .refine((val) => postalCodeRegex.US.test(val) || postalCodeRegex.RU.test(val), {
        message: 'Invalid postal code format for US or Russia',
      }),

    country: z.string().refine((val) => countryList.includes(val), {
      message: 'Please select a valid country',
    }),
  }),
});

export function FormRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
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
        inputValue={watch('email')}
      />
      <Input
        className={styles.password}
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password}
        inputValue={watch('password')}
      />
      <Input
        className={styles.firstname}
        label="Firstname"
        name="firstName"
        placeholder="Firstname"
        type="text"
        register={register}
        error={errors.firstName}
        inputValue={watch('firstName')}
      />
      <Input
        className={styles.lastname}
        label="Lastname"
        name="lastName"
        placeholder="Lastname"
        type="text"
        register={register}
        error={errors.lastName}
        inputValue={watch('lastName')}
      />
      <Input
        className={styles.datebirthday}
        label="Datebirthday"
        name="dateOfBirth"
        placeholder="Datebirthday"
        type="date"
        register={register}
        error={errors.dateOfBirth}
        inputValue={watch('dateOfBirth')}
      />

      <h4 className={`${styles.header} ${styles.address}`}>Address</h4>
      <Input
        className={styles.street}
        label="Street"
        name="addresses.streetName"
        placeholder="Street"
        type="text"
        register={register}
        error={errors.addresses?.streetName}
        touchedFields={touchedFields}
        inputValue={watch('addresses.streetName')}
      />

      <div className={styles.townPostcode}>
        <Input
          className={styles.town}
          label="City"
          name="addresses.city"
          placeholder="City"
          type="text"
          register={register}
          error={errors.addresses?.city}
          touchedFields={touchedFields}
          inputValue={watch('addresses.city')}
        />
        <Input
          className={styles.postcode}
          label="Postcode"
          name="addresses.postalCode"
          placeholder="Postcode"
          type="text"
          register={register}
          error={errors.addresses?.postalCode}
          touchedFields={touchedFields}
          inputValue={watch('addresses.postalCode')}
        />
      </div>
      <Input
        className={styles.country}
        label="Country"
        name="addresses.country"
        placeholder="Country"
        type="text"
        register={register}
        error={errors.addresses?.country}
        touchedFields={touchedFields}
        inputValue={watch('addresses.country')}
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
