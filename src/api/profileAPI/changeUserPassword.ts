import toast from 'react-hot-toast';
import { getCookie } from '../../utils/getCookie';

interface changeUserPasswordProps {
  currentPassword: string;
  newPassword: string;
  version: number;
}

export const changeUserPassword = async ({
  currentPassword,
  newPassword,
  version,
}: changeUserPasswordProps) => {
  const tokenCustomer = getCookie('access_token');

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/me/password`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenCustomer}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          version,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      throw new Error('Failed to change password');
    } else {
      toast.success('Change successfull. Please login.');
    }
  } catch (error) {
    console.error('Error change password:', error);
    return null;
  }
};
