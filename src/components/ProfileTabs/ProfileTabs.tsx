import { useState } from 'react';
import styles from './ProfileTabs.module.css';
import { ProfileInformation } from '../Profile/ProfileInformation/ProfileInformation';
import { ProfileCustomer } from '../../types/user/customer';

const tabs = [
  { id: 'profile', label: 'Profile Info' },
  { id: 'shipping', label: 'Shipping Info' },
  { id: 'billing', label: 'Billing Info' },
  { id: 'personal', label: 'Personal Info' },
];

interface ProfileTabsProps {
  customer: ProfileCustomer;
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
        {activeTab === 'shipping' && <div>Shipping Information content here</div>}
        {activeTab === 'billing' && <div>Billing Information content here</div>}
        {activeTab === 'personal' && <div>Personal Information content here</div>}
      </div>
    </div>
  );
};
