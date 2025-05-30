import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import styles from './Input.module.css';
import { EyeOffIcon } from '../../Icons/EyeOffIcon';
import { EyeIcon } from '../../Icons/EyeIcon';
import { useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';

  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={className}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <input
          className={`${styles.input} ${error && styles.error_input}  ${!error && inputValue && styles.success_input}`}
          type={inputType}
          placeholder={placeholder}
          id={name}
          autoComplete="on"
          disabled={disabled}
          {...register(name, { valueAsNumber })}
        />

        {isPasswordField && (
          <button
            type="button"
            className={styles.toggle_button}
            onClick={() => setShowPassword((prev: boolean) => !prev)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
      <span className={styles.error_message}>{error && error.message}</span>
    </div>
  );
};
