import { useForm } from 'react-hook-form';
import { ProfileCustomer } from '../../../types/user/customer';
import { Input } from '../../ui/Input/Input';
import styles from './ProfileInformation.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitButton } from '../../ui/SubmitButton/SubmitButton';
import { ProfileFormData, profileSchema } from '../../../schemas/profile.schema';
import { changeProfileInformation } from '../../../api/changeProfileInformation';
import { getCookie } from '../../../utils/getCookie';

interface ProfileInformationProps {
  customer: ProfileCustomer;
  refreshCustomer: () => Promise<void>;
}

export const ProfileInformation = ({ customer, refreshCustomer }: ProfileInformationProps) => {
  const { firstName, lastName, dateOfBirth, email } = customer;
  const tokenCustomer = getCookie('access_token');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await changeProfileInformation({
        userToken: tokenCustomer!,
        customer: data,
        version: customer.version,
      });

      await refreshCustomer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (customer) {
      reset({
        firstName,
        lastName,
        dateOfBirth,
        email,
      });
    }
  }, [customer, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

      <SubmitButton isDisabled={!isValid} isLoading={isSubmitting} type="submit">
        Save
      </SubmitButton>
    </form>
  );
};
