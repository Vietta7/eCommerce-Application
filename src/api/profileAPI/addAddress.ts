import toast from 'react-hot-toast';
import { Address } from '../../types/user/formData';

interface Action {
  action: string;
  address?: Address;
  addressKey?: string;
}

interface addAddressProps {
  userToken: string;
  version: number;
  actions: Action[];
}

export const addAddress = async ({ userToken, version, actions }: addAddressProps) => {
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
      throw new Error('Error add address');
    } else {
      toast.success('Add address successfull!');
    }
  } catch (error) {
    console.error('Error add address:', error);
    return null;
  }
};
