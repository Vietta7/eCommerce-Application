import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { FormData } from '../../../types/user/formData';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  inputValue: string;
  className?: string;
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
        className={`${styles.input} ${error && styles.error_input}  ${!error && inputValue && styles.success_input}`}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { valueAsNumber })}
      />
      <span className={styles.error_message}>{error && error.message}</span>
    </div>
  );
};
