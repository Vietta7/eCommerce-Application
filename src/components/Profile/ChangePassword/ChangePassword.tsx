import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from '../../../schemas/changePasswordSchema';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { Customer } from '../../../types/user/customer';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/api';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './ChangePassword.module.css';
import { SubmitButton } from '../../ui/SubmitButton/SubmitButton';
import { changeUserPassword } from '../../../api/profileAPI/changeUserPassword';
import { ROUTES } from '../../../routes/routes';

interface ChangePasswordProps {
  customer: Customer;
  refreshCustomer: () => Promise<void>;
}

export const ChangePassword = ({ customer, refreshCustomer }: ChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const { version } = customer;
  const navigate = useNavigate();

  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await changeUserPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        version,
      });
      if (response === undefined) {
        await refreshCustomer();
        reset();
        logout();
        if (isAuthenticated) setAuthenticated(false);
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        label="Current Password"
        name="currentPassword"
        register={register}
        inputValue={watch('currentPassword')}
        error={errors.currentPassword}
        placeholder="Current Password"
      />
      <Input
        type="password"
        label="New Password"
        name="newPassword"
        register={register}
        inputValue={watch('newPassword')}
        error={errors.newPassword}
        placeholder="New Password"
      />
      <Input
        type="password"
        label="Confirm New Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        inputValue={watch('confirmPassword')}
        placeholder="Confirm New Password"
      />

      <div className={styles.btns}>
        <SubmitButton isDisabled={!isValid} isLoading={isSubmitting} className={styles.submit_btn}>
          Save
        </SubmitButton>
        <Button className={styles.cancel_btn} type="button" onClick={() => reset()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
