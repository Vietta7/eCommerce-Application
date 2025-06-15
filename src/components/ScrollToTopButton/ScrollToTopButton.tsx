import React, { useEffect, useState } from 'react';
import { ArrowTopIcon } from '../Icons/BackIcons';
import styles from './ScrollToTopButton.module.css';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} className={styles.scrollToTopButton}>
        <ArrowTopIcon />
      </button>
    )
  );
};

export default ScrollToTopButton;
