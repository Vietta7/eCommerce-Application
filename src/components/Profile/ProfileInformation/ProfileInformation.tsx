import { useForm } from 'react-hook-form';
import { ProfileCustomer } from '../../../types/user/customer';
import { Input } from '../../ui/Input/Input';
import styles from './ProfileInformation.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitButton } from '../../ui/SubmitButton/SubmitButton';
import { ProfileFormData, profileSchema } from '../../../schemas/profile.schema';
import { getCookie } from '../../../utils/getCookie';
import { changeProfileInformation } from '../../../api/profileAPI/changeProfileInformation';
import { EditButton } from '../../ui/EditButton/EditButton';

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
    mode: 'onChange',
  });

  const [isEdit, setIsEdit] = useState<boolean>(true);

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

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await changeProfileInformation({
        userToken: tokenCustomer!,
        customer: data,
        version: customer.version,
      });

      await refreshCustomer();
      handleClickEdit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

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
        disabled={isEdit}
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
        disabled={isEdit}
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
        disabled={isEdit}
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
        disabled={isEdit}
      />

      {isEdit ? (
        <EditButton className={styles.edit_btn} onClick={handleClickEdit} />
      ) : (
        <SubmitButton isDisabled={!isValid} isLoading={isSubmitting} type="submit">
          Save
        </SubmitButton>
      )}
    </form>
  );
};
