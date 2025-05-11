import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input/Input';
import styles from './FormRegistration.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useContext, useState } from 'react';
import { AccessTokenContext } from '../../context/AccessTokenContext';
import { Loader } from '../../ui-kit/Loader/Loader';
import { FormData } from '../../types/user/formData';

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
  address: z.object({
    streetName: z
      .string()
      .min(1, 'Street is required')
      .regex(/^[A-Za-z0-9]+$/, 'Use only english letters'),
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
  }),
});

export function FormRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const [errorAPI, setErrorApi] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  async function createUser(data: FormData, token: string) {
    try {
      const response = await fetch(
        'https://api.europe-west1.gcp.commercetools.com/dino-land/me/signup',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          setErrorApi(errorData.message);
          throw new Error(errorData.message);
        }
        throw new Error('Error create user');
      }
      await response.json();

      const resToken = await fetch('https://dino-land.netlify.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      const { access_token: accessToken } = await resToken.json();
      document.cookie = `access_token=${accessToken}; path=/`;

      reset();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const token = useContext(AccessTokenContext);

  const onSumbit = async (data: FormData) => {
    setErrorApi('');
    const userData = {
      ...data,
      addresses: [data.address],
    };

    try {
      setIsLoading(true);
      await createUser(userData, token);
      setIsLoading(false);
      setSuccessMessage('User created successfully!');

      //   setTimeout(() => {
      //     setSuccessMessage('');
      //     navigate('/');
      //   }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw error;
    }
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
        name="address.streetName"
        placeholder="Street"
        type="text"
        register={register}
        error={errors.address?.streetName}
        inputValue={watch('address.streetName')}
      />

      <div className={styles.townPostcode}>
        <Input
          className={styles.town}
          label="City"
          name="address.city"
          placeholder="City"
          type="text"
          register={register}
          error={errors.address?.city}
          inputValue={watch('address.city')}
        />
        <Input
          className={styles.postcode}
          label="Postcode"
          name="address.postalCode"
          placeholder="Postcode"
          type="text"
          register={register}
          error={errors.address?.postalCode}
          inputValue={watch('address.postalCode')}
        />
      </div>

      <div className={`${styles.country} ${styles.selectCountry}`}>
        <label className={styles.selectLabel} htmlFor="country">
          Country
        </label>
        <select id="country" {...register('address.country')} name="address.country">
          <option value="RU">Russia</option>
          <option value="US">United States</option>
        </select>
        {errors.address?.country && (
          <span className={styles.selectErrorMessage}>{errors.address.country.message}</span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={!isValid}>
        {isLoading ? <Loader /> : 'Sign up '}
      </button>
      <div className={styles.linkToLogin}>
        {errorAPI && <span className={styles.selectErrorMessage}>{errorAPI}</span>}
        {successMessage && <span className={styles.successMessage}>{successMessage}</span>}
        <p>
          Already have an account?
          <a className={styles.link} href="/login">
            Log In
          </a>
        </p>
      </div>
    </form>
  );
}
