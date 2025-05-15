import React from 'react';
import styles from './ChekBox.module.css';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ label, ...inputProps }) => {
  return (
    <div className={styles.checkbox_wrapper}>
      <label className={styles.label}>
        <input className={styles.native_checkbox} type="checkbox" {...inputProps} />
        <span className={styles.custom_box}></span>
        <span className={styles.label_text}>{label}</span>
      </label>
    </div>
  );
};
