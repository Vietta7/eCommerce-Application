import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input/Input';
import styles from './FormRegistration.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context/AccessTokenContext';
import { Loader } from '../../ui-kit/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { FormAddress } from '../FormAddress/FormAddress';
import { CheckBox } from '../ui/CheckBox/CheckBox';
import { createCustomer } from '../../api/createCustomer';
import { addAddresses } from '../../api/addAddresses';
import { RegisterFormData, registerSchema } from '../../schemas/register.schema';
import { logIn } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { createCart } from '../../api/cartAPI/createCart';

export function FormRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      shippingAddress: {
        country: 'RU',
      },
      billingAddress: {
        country: 'RU',
      },
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const setAuthenticated = useContext(AuthContext).setAuthenticated;

  const copyShippingToBilling = () => {
    const shipping = watch('shippingAddress');
    if (shipping) {
      setValue('billingAddress.streetName', shipping.streetName, { shouldValidate: true });
      setValue('billingAddress.city', shipping.city, { shouldValidate: true });
      setValue('billingAddress.postalCode', shipping.postalCode, { shouldValidate: true });
      setValue('billingAddress.country', shipping.country, { shouldValidate: true });
    }
  };

  const clearBillingAddress = () => {
    setValue('billingAddress.streetName', '');
    setValue('billingAddress.city', '');
    setValue('billingAddress.postalCode', '');
  };

  const isBillingSameAsShipping = watch('isBillingSameAsShipping');

  useEffect(() => {
    if (isBillingSameAsShipping) {
      copyShippingToBilling();
    } else {
      clearBillingAddress();
    }
  }, [isBillingSameAsShipping]);

  const token = useContext(AccessTokenContext);

  const onSumbit = async (data: RegisterFormData) => {
    const userData = isBillingSameAsShipping
      ? {
          ...data,
          addresses: [data.shippingAddress],
        }
      : {
          ...data,
          addresses: [data.shippingAddress, data.billingAddress],
        };

    try {
      setIsLoading(true);
      const newCustomer = await createCustomer(userData, token);
      const tokenCustomer = await logIn({ email: data.email, password: data.password });
      await addAddresses({ data: userData, customer: newCustomer, userToken: tokenCustomer });
      await createCart({ customerId: newCustomer.customerId });
      setAuthenticated(true);
      setIsLoading(false);
      reset();
      navigate('/');
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
        label="Date Вirthday"
        name="dateOfBirth"
        placeholder="Datebirthday"
        type="date"
        register={register}
        error={errors.dateOfBirth}
        inputValue={watch('dateOfBirth')}
      />

      <div className={styles.shipping_address}>
        <FormAddress
          title="Shipping Address"
          type="shippingAddress"
          register={register}
          errors={errors}
          watch={watch}
        />
      </div>
      <div className={styles.billing_address}>
        <FormAddress
          title="Billing Address"
          type="billingAddress"
          register={register}
          errors={errors}
          watch={watch}
        />
      </div>

      <div className={styles.same_checkbox}>
        <CheckBox
          label="Are the billing and shipping addresses the same?"
          {...register('isBillingSameAsShipping')}
        />
        <CheckBox label="Use as default address" {...register('isShippingDefaultAddress')} />
      </div>
      <div className={styles.default_billing_checkbox}>
        <CheckBox label="Use as default address" {...register('isBillingDefaultAddress')} />
      </div>

      <button type="submit" className={styles.submit_btn} disabled={!isValid}>
        {isLoading ? <Loader /> : 'Sign up '}
      </button>
      <div className={styles.link_to_login}>
        <p>
          Already have an account?
          <Link className={styles.link} to="/login">
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
}
