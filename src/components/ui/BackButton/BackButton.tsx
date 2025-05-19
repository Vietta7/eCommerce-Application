import React from 'react';
import styles from './BackButton.module.css';
import { BackIcons } from '../../Icons/BackIcons';

interface ExitButtonProps {
  className?: string;
  onClick?: () => void;
}

export const BackButton: React.FC<ExitButtonProps> = ({ className = '', onClick }) => {
  return (
    <button className={`${className} ${styles.exit}`} onClick={onClick}>
      <BackIcons />
    </button>
  );
};
