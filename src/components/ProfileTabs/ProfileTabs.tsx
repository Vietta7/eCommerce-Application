import { useState } from 'react';
import styles from './ProfileTabs.module.css';
import { ProfileInformation } from '../Profile/ProfileInformation/ProfileInformation';
import { AddressCustomer, Customer, ProfileCustomer } from '../../types/user/customer';
import { AddressInformation } from '../Profile/AddressInformation/AddressInformation';
import { ChangePassword } from '../Profile/ChangePassword/ChangePassword';

const tabs = [
  { id: 'profile', label: 'Profile Info' },
  { id: 'shipping', label: 'Shipping Address' },
  { id: 'billing', label: 'Billing Address' },
  { id: 'password', label: 'Password' },
];

interface ProfileTabsProps {
  customer: Customer & ProfileCustomer & AddressCustomer;
  refreshCustomer: () => Promise<void>;
}

export const ProfileTabs = ({ customer, refreshCustomer }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className={styles.content}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? styles.active_tab : styles.tab}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tab_content}>
        {activeTab === 'profile' && (
          <ProfileInformation customer={customer} refreshCustomer={refreshCustomer} />
        )}
        {activeTab === 'shipping' && (
          <AddressInformation
            addressType="shipping"
            customer={customer}
            refreshCustomer={refreshCustomer}
          />
        )}
        {activeTab === 'billing' && (
          <AddressInformation
            addressType="billing"
            customer={customer}
            refreshCustomer={refreshCustomer}
          />
        )}
        {activeTab === 'password' && (
          <ChangePassword refreshCustomer={refreshCustomer} customer={customer} />
        )}
      </div>
    </div>
  );
};
