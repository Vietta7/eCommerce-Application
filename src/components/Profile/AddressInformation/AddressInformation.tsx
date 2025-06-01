import { getCookie } from '../../../utils/getCookie';
import { AddressCustomer, Customer } from '../../../types/user/customer';
import { AddressEditor } from '../../AddressEditor/AddressEditor';
import { Address } from '../../../types/user/formData';
import styles from './AddressInformation.module.css';
import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { Action, changeAddress } from '../../../api/profileAPI/changeAddress';
import { removeAddress } from '../../../api/profileAPI/removeAddress';
import { addAddress } from '../../../api/profileAPI/addAddress';
import { ExitIcon } from '../../Icons/ExitIcon';

interface AddressInformationProps {
  customer: Customer & AddressCustomer;
  refreshCustomer: () => Promise<void>;
  addressType: string;
}

export const AddressInformation = ({
  customer,
  refreshCustomer,
  addressType,
}: AddressInformationProps) => {
  const tokenCustomer = getCookie('access_token');

  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const {
    addresses,
    shippingAddressIds,
    version,
    defaultShippingAddressId,
    billingAddressIds,
    defaultBillingAddressId,
  } = customer;

  let addressesByType = [];

  const shippingAddresses = addresses.filter((address) =>
    shippingAddressIds.includes(address.id as string),
  );

  const billingAddresses = addresses.filter((address) =>
    billingAddressIds.includes(address.id as string),
  );

  if (addressType === 'shipping') {
    addressesByType = shippingAddresses;
  } else {
    addressesByType = billingAddresses;
  }

  const onSubmitAddress = async (address: Address, addressId: string) => {
    const actions: Action[] = [{ action: 'changeAddress', addressId, address: address }];

    if (address.isShippingDefaultAddress) {
      if (addressId !== defaultShippingAddressId) {
        actions.push({ action: 'setDefaultShippingAddress', addressId });
      }
    } else if (addressId === defaultShippingAddressId) {
      actions.push({ action: 'setDefaultShippingAddress' });
    }

    if (address.isBillingDefaultAddress) {
      if (addressId !== defaultBillingAddressId) {
        actions.push({ action: 'setDefaultBillingAddress', addressId });
      }
    } else if (addressId === defaultBillingAddressId) {
      actions.push({ action: 'setDefaultBillingAddress' });
    }
    try {
      await changeAddress({ actions, userToken: tokenCustomer!, version });

      await refreshCustomer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onRemoveAddress = async (addressId: string) => {
    try {
      await removeAddress({
        userToken: tokenCustomer!,
        actions: [{ action: 'removeAddress', addressId }],
        version,
      });

      await refreshCustomer();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onAddAddressClick = () => {
    setIsAddingAddress((prev) => !prev);
  };

  const onAddNewAddress = async (address: Address) => {
    const key = addressType === 'shipping' ? `shipping-${new Date()}` : `billing-${new Date()}`;

    const actions = [
      { action: 'addAddress', address: { ...address, key } },
      {
        action: addressType === 'shipping' ? 'addShippingAddressId' : 'addBillingAddressId',
        addressKey: key,
      },
    ];

    if (address.isShippingDefaultAddress) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressKey: key,
      });
    }

    if (address.isBillingDefaultAddress) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressKey: key,
      });
    }

    try {
      await addAddress({
        userToken: tokenCustomer!,
        actions,
        version,
      });

      await refreshCustomer();
      setIsAddingAddress(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.address_content}>
        {addressesByType.length === 0 ? (
          <p className={styles.empty_adresses}>
            You have not created any addresses yet. Please click button Add address.
          </p>
        ) : (
          addressesByType.map((address, i) => (
            <div className={styles.address} key={address.id}>
              <h4 className={styles.header_address}>
                Addrees #{i + 1}
                {(address.id === defaultShippingAddressId &&
                  addressType === 'shipping' &&
                  ' - Default Address') ||
                  (address.id === defaultBillingAddressId &&
                    addressType === 'billing' &&
                    ' - Default Address')}
              </h4>
              <AddressEditor
                addressId={address.id!}
                initialAddress={address}
                onSubmit={(data) => onSubmitAddress(data, address.id!)}
                onRemoveAddress={() => onRemoveAddress(address.id!)}
                isDefaultShipping={address.id === defaultShippingAddressId}
                isDefaultBilling={address.id === defaultBillingAddressId}
                addressType={addressType}
              />
            </div>
          ))
        )}
      </div>
      {isAddingAddress ? (
        <div className={`${styles.address} ${styles.new_address}`}>
          <div className={styles.header_wrapper}>
            <h4 className={styles.header_address}>Add address</h4>
            <Button className={styles.btn_exit} onClick={onAddAddressClick}>
              <ExitIcon />
            </Button>
          </div>
          <AddressEditor
            addressId=""
            initialAddress={{ streetName: '', city: '', postalCode: '', country: 'RU' }}
            onSubmit={onAddNewAddress}
            onRemoveAddress={() => setIsAddingAddress(false)}
            isDefaultShipping={false}
            isDefaultBilling={false}
            addressType={addressType}
          />
        </div>
      ) : (
        <Button className={styles.address_btn} onClick={onAddAddressClick}>
          Add address
        </Button>
      )}
    </>
  );
};
