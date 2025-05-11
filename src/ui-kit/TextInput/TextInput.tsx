import { ChangeEvent } from 'react';
import styles from './TextInput.module.css';

type Type = 'text' | 'textarea';

interface Props {
  onChange: (str: string) => void;
  value: string;
  label?: string;
  placeholder?: string;
  type?: Type;
}

const TextInput: React.FC<Props> = (props) => {
  const { onChange, value, label = 'email', placeholder = 'email', type = 'text' } = props;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.input__container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        onChange={onChangeHandler}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
