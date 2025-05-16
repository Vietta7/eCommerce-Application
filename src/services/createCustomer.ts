import toast from 'react-hot-toast';
import { FormData } from '../types/user/formData';

export async function createCustomer(data: FormData, token: string) {
  try {
    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/dino-land/me/signup',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      throw new Error('Error create user');
    }

    const currentCustomer = await response.json();
    const { customer } = currentCustomer;
    toast.success('User created successfully!');

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
