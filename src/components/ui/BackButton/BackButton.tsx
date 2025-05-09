import React from 'react';
import styles from './BackButton.module.css';

interface ExitButtonProps {
  className?: string;
}

export const BackButton: React.FC<ExitButtonProps> = ({ className = '' }) => {
  return (
    <button className={`${className} ${styles.exit}`}>
      <svg
        width="45.000000"
        height="45.000000"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="clip3_259">
            <rect
              id="Button"
              rx="11.500000"
              width="44.000000"
              height="44.000000"
              transform="translate(0.500000 0.500000)"
              fill="white"
              fillOpacity="0"
            />
          </clipPath>
        </defs>
        <rect
          id="Назад"
          rx="0.000000"
          width="44.000000"
          height="44.000000"
          transform="translate(0.500000 0.500000)"
          fill="#FFFFFF"
          fillOpacity="0"
        />
        <path
          d="M23.94 31.05L14.96 22.06L23.94 13.07L25 14.13L16.55 22.59L16.02 22.06L16.55 21.53L25 29.99L23.94 31.05Z"
          fill="currentColor"
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
        <rect
          rx="11.500000"
          width="44.000000"
          height="44.000000"
          transform="translate(0.500000 0.500000)"
          stroke="currentColor"
          strokeOpacity="1.000000"
          strokeWidth="1.000000"
        />
      </svg>
    </button>
  );
};
