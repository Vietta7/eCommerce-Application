import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import styles from './Input.module.css';

export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

export type ValidFieldNames = keyof FormData;

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: Path<FormData>;
  className?: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  inputValue: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  className,
  error,
  register,
  valueAsNumber,
  inputValue,
}) => {
  return (
    <div className={className}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''}  ${!error && inputValue ? styles.successInput : ''}`}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { valueAsNumber })}
      />
      <span className={styles.errorMessage}>{error && error.message}</span>
    </div>
  );
};
