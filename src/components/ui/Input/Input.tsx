import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  inputValue: string;
  className?: string;
  valueAsNumber?: boolean;
  disabled?: boolean;
}

export const Input = <T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  className,
  error,
  register,
  valueAsNumber,
  inputValue,
  disabled,
}: InputProps<T>) => {
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
        autoComplete="on"
        disabled={disabled}
        {...register(name, { valueAsNumber })}
      />
      <span className={styles.error_message}>{error && error.message}</span>
    </div>
  );
};
