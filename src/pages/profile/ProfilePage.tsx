import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { getCookie } from '../../utils/getCookie';
import { getCustomer } from '../../api/getCustomer';
import { ProfileCustomer } from '../../types/user/customer';
import { ProfileTabs } from '../../components/ProfileTabs/ProfileTabs';

const defaultProfile = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  version: 1,
};

export const ProfilePage = () => {
  const [customer, setCustomer] = useState<ProfileCustomer>(defaultProfile);

  const fetchCustomer = async () => {
    const tokenCustomer = getCookie('access_token');
    if (tokenCustomer) {
      getCustomer({ userToken: tokenCustomer }).then((data) => setCustomer(data));
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Account</h1>
        <h2 className={styles.customer_name}>{customer.firstName}</h2>
        <ProfileTabs customer={customer} refreshCustomer={fetchCustomer} />
      </div>
    </div>
  );
};
