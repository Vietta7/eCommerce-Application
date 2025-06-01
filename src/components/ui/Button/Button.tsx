import React from 'react';
import styles from './Button.module.css';

type SubmitButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<SubmitButtonProps> = ({
  isDisabled = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={`${styles.btn} ${className}`} disabled={isDisabled} {...props}>
      {children}
    </button>
  );
};
