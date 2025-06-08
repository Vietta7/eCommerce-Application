import toast from 'react-hot-toast';

interface Action {
  action: 'removeAddress';
  addressId: string;
}

interface removeAddressProps {
  userToken: string;
  version: number;
  actions: Action[];
}

export const removeAddress = async ({ userToken, version, actions }: removeAddressProps) => {
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
      throw new Error('Error remove address');
    } else {
      toast.success('Remove address successfull!');
    }
  } catch (error) {
    console.error('Error remove address:', error);
    return null;
  }
};
