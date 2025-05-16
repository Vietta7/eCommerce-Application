import { Customer } from '../types/user/customer';
import { FormData } from '../types/user/formData';

export const addAddresses = async (data: FormData, customer: Customer, userToken: string) => {
  console.log(customer);

  const isShippingDefaultAddress = data.isShippingDefaultAddress;
  const isBillingDefaultAddress = data.isBillingDefaultAddress;
  const isBillingSameAsShipping = data.isBillingSameAsShipping;

  const shippingId = customer.addresses[0].id;
  const billingId = data.isBillingSameAsShipping ? 1 : customer.addresses[1].id;

  const actions = [
    { action: 'addShippingAddressId', addressId: shippingId },
    { action: 'addBillingAddressId', addressId: billingId },
  ];

  if (isBillingSameAsShipping) {
    actions.forEach((item) =>
      item.action === 'addBillingAddressId' ? (item.addressId = shippingId) : null,
    );
  }

  if (isShippingDefaultAddress) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: shippingId });
  }
  if (isBillingDefaultAddress) {
    if (data.isBillingSameAsShipping) {
      actions.push({ action: 'setDefaultBillingAddress', addressId: shippingId });
    } else {
      actions.push({ action: 'setDefaultBillingAddress', addressId: billingId });
    }
  }

  try {
    await fetch(`https://api.europe-west1.gcp.commercetools.com/dino-land/me`, {
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
  } catch (error) {
    console.error('Error add addresses:', error);
    return null;
  }
};
