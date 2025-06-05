import toast from 'react-hot-toast';
import { Address } from '../../types/user/formData';

export type Action =
  | { action: 'changeAddress'; address: Address; addressId: string }
  | { action: 'setDefaultShippingAddress'; addressId?: string }
  | { action: 'setDefaultBillingAddress'; addressId?: string };

interface changeAddressProps {
  userToken?: string;
  version: number;
  actions: Action[];
}

export const changeAddress = async ({ actions, userToken, version }: changeAddressProps) => {
  try {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/dino-land/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions,
        version,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      throw new Error('Error change address');
    } else {
      toast.success('Change successfull!');
    }
  } catch (error) {
    console.error('Error change profile information:', error);
    return null;
  }
};
