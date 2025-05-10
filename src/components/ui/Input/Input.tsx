import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { FormData } from '../../../types/user/formData';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: Path<FormData>;
  className?: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  inputValue: string;
  valueAsNumber?: boolean;
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
        className={`${styles.input} ${error && styles.errorInput}  ${!error && inputValue && styles.successInput}`}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { valueAsNumber })}
      />
      <span className={styles.errorMessage}>{error && error.message}</span>
    </div>
  );
};
