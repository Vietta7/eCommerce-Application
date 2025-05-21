import styles from './AutorisationPage.module.css';
import logo from '../../assets/img/logo.svg';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eyeOff.svg';
import { BackButton } from '../../components/ui/BackButton/BackButton';
import { logIn } from '../../api/api';
import { Input } from '../../components/ui/Input/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react';
import { Loader } from '../../ui-kit/Loader/Loader';
import { FormDataLogin } from '../../types/user/formData';
import { autorisationFormSchema, inputsData } from '../model/data';
import { InputArray } from '../../types/common';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function AutorisationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setAuthenticated = useContext(AuthContext).setAuthenticated;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(autorisationFormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: 'Damalsd@asd.rt',
      password: 'Q1w2e3r4t5ZXc',
    },
  });

  const navigate = useNavigate();

  const onSumbit = async (data: FormDataLogin) => {
    try {
      setIsLoading(true);
      await logIn(data);
      setIsLoading(false);
      toast.success('Successfully autorisation!');
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error?.message);
      }
    }
  };

  const createInput = ({ label, type }: InputArray) => {
    if (type !== 'password') {
      return (
        <Input
          className={styles[type]}
          label={label}
          name={type}
          placeholder={label}
          type={type}
          register={register}
          error={errors[type]}
          inputValue={watch(type)}
        />
      );
    }
    return (
      <div key={type} className={styles.password_wrapper}>
        <Input
          className={styles[type]}
          label={label}
          name={type}
          placeholder={label}
          type={showPassword ? 'text' : 'password'}
          register={register}
          error={errors[type]}
          inputValue={watch(type)}
        />
        <button
          type="button"
          className={styles.toggle_button}
          onClick={() => setShowPassword((v) => !v)}
        >
          <img
            className={styles.toggle_icon}
            src={showPassword ? eye : eyeOff}
            alt={showPassword ? 'Hide password' : 'Show password'}
          />
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <BackButton className={styles.backButton} onClick={() => navigate(-1)}></BackButton>
      <div className={styles.content}>
        <div className={styles.title_wrapper}>
          <img className={styles.icon} src={logo} alt="logo" />
          <h1 className={styles.title}>DINO-LAND</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
          {inputsData.map(({ label, type }, index) => {
            return <React.Fragment key={index}>{createInput({ label, type })}</React.Fragment>;
          })}
          <div className={styles.button_container}>
            <button type="submit" className={styles.button} disabled={!isValid}>
              {isLoading ? <Loader /> : 'Log In'}
            </button>
            <div className={styles.navigation}>
              <p className={styles.p}>Don`t have an account?</p>
              <Link to="/registration">Sign up </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
