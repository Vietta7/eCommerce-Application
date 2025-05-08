import { useContext } from 'react';
import styles from './RegistrationPage.module.css';
import { AccessTokenContext } from '../../context/AccessTokenContext';

export default function RegistrationPage() {
  const token = useContext(AccessTokenContext);
  console.log(token);

  return <div className={styles.title}>Registration Page</div>;
}
