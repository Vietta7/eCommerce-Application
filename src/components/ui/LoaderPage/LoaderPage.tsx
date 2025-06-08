import { Loader } from '../../../ui-kit/Loader/Loader';
import styles from './LoaderPage.module.css';

export const LoaderPage = () => {
  return (
    <div className={styles.loader_wrapper}>
      <Loader className={styles.loader_home} />
    </div>
  );
};
