import toast from 'react-hot-toast';
import { RegisterFormData } from '../schemas/register.schema';
import { Customer } from '../types/user/customer';

interface addAddressesProps {
  data: RegisterFormData;
  customer: Customer;
  userToken: string;
}

export const addAddresses = async ({ data, customer, userToken }: addAddressesProps) => {
  const { isShippingDefaultAddress, isBillingDefaultAddress, isBillingSameAsShipping } = data;

  const shippingId = customer.addresses[0].id;
  const billingId = isBillingSameAsShipping ? shippingId : customer.addresses[1].id;

  const actions = [
    { action: 'addShippingAddressId', addressId: shippingId },
    { action: 'addBillingAddressId', addressId: billingId },
  ];

  if (isBillingSameAsShipping) {
    actions.forEach(({ action, addressId }) =>
      action === 'addBillingAddressId' ? { addressId: shippingId } : { action, addressId },
    );
  }

  if (isShippingDefaultAddress) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: shippingId });
  }
  if (isBillingDefaultAddress) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: isBillingSameAsShipping ? shippingId : billingId,
    });
  }

  try {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/dino-land/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: customer.version,
        actions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      throw new Error('Error add addresses');
    }
  } catch (error) {
    console.error('Error add addresses:', error);
    return null;
  }
};
