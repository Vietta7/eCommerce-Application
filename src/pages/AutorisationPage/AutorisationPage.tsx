import styles from './AutorisationPage.module.css';
import logo from '../../../public/logo.svg';
import { BackButton } from '../../components/ui/BackButton/BackButton';
import { logIn } from '../../api/api';
import { Input } from '../../components/ui/Input/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Loader } from '../../ui-kit/Loader/Loader';
import { FormDataLogin } from '../../types/user/formData';
import { autorisationFormSchema, inputsData } from '../model/data';
import { InputArray } from '../../types/common';

export default function AutorisationPage() {
  const [errorAPI, setErrorApi] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(autorisationFormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSumbit = async (data: FormDataLogin) => {
    setErrorApi('');

    try {
      setIsLoading(true);
      await logIn(data);
      setIsLoading(false);
      setSuccessMessage('Autorisetaion successfully!');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setErrorApi(error?.message);
      }
    }
  };

  const createInput = ({ label, type }: InputArray) => {
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
  };

  return (
    <div className={styles.container}>
      <BackButton className={styles.backButton}></BackButton>
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
              {/* TODO: update into modal or popup */}
              {errorAPI && <span className={styles.selectErrorMessage}>{errorAPI}</span>}
              {successMessage && <span className={styles.successMessage}>{successMessage}</span>}
              <p className={styles.p}>Don`t have an account?</p>
              <a href="/registration">Sign up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
