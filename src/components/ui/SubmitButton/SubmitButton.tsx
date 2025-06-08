import React from 'react';
import styles from './SubmitButton.module.css';
import { Loader } from '../../../ui-kit/Loader/Loader';

type SubmitButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  isDisabled = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`${styles.submit_btn} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
