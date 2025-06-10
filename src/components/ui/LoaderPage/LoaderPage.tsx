import { Loader } from '../../../ui-kit/Loader/Loader';
import styles from './LoaderPage.module.css';

interface LoaderPageProps {
  className?: string;
}

export const LoaderPage = ({ className }: LoaderPageProps) => {
  return (
    <div className={`${styles.loader_wrapper} ${className}`}>
      <Loader className={styles.loader_home} />
    </div>
  );
};
