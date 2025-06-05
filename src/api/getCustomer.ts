import toast from 'react-hot-toast';

interface getCustomerProps {
  userToken: string;
}

export const getCustomer = async ({ userToken }: getCustomerProps) => {
  try {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/dino-land/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    const customer = await response.json();

    if (!response.ok) {
      if (customer.message) {
        toast.error(customer.message);
        throw new Error(customer.message);
      }
      throw new Error('Error add addresses');
    }

    return customer;
  } catch (error) {
    console.error('Error add addresses:', error);
    return null;
  }
};
