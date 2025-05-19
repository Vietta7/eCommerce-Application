import toast from 'react-hot-toast';
import { RegisterFormData } from '../schemas/register.schema';

export const loginCustomer = async (data: RegisterFormData) => {
  try {
    const response = await fetch('https://dino-land.netlify.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
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

    const { access_token: accessToken } = await response.json();
    document.cookie = `access_token=${accessToken}; path=/`;
    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
