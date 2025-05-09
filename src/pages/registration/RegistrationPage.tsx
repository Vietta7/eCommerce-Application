import { useContext } from 'react';
import styles from './RegistrationPage.module.css';
import { AccessTokenContext } from '../../context/AccessTokenContext';
import { FormRegistration } from '../../components/FormRegistration/FormRegistration';
import { ExitButton } from '../../components/ui/ExitButton/ExitButton';

export default function RegistrationPage() {
  const token = useContext(AccessTokenContext);
  console.log(token);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ExitButton className={styles.exitBtn} />
        <h1 className={styles.title}>Sign up</h1>
        <FormRegistration />
      </div>
    </div>
  );
}
