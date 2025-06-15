import styles from './Loader.module.css';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return <span className={`${styles.loader} ${className}`}></span>;
};
