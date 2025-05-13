import styles from './RegistrationPage.module.css';
import { FormRegistration } from '../../components/FormRegistration/FormRegistration';
import { BackButton } from '../../components/ui/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BackButton className={styles.exitBtn} onClick={() => navigate(-1)} />
        <h1 className={styles.title}>Sign up</h1>
        <FormRegistration />
      </div>
    </div>
  );
}
