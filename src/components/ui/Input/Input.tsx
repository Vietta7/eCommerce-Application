import { FieldError, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';

export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirthday: string;
  street: string;
  town: string;
  postCode: string;
  country: string;
};

export type ValidFieldNames = keyof FormData;

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  className?: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  touchedFields: Partial<Record<ValidFieldNames, boolean>>;
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
  touchedFields,
  inputValue,
}: InputProps) => {
  const isTouched = touchedFields[name];

  return (
    <div className={className}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''}  ${!error && isTouched && inputValue ? styles.successInput : ''}`}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { valueAsNumber })}
      />
      <span className={styles.errorMessage}>{error && error.message}</span>
    </div>
  );
};
