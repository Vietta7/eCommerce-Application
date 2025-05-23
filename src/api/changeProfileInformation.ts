import toast from 'react-hot-toast';
import { ProfileFormData } from '../schemas/profile.schema';

interface changeProfileInforamtionProps {
  customer: ProfileFormData;
  userToken: string;
  version: number;
}

export const changeProfileInformation = async ({
  customer,
  userToken,
  version,
}: changeProfileInforamtionProps) => {
  const { firstName, lastName, dateOfBirth } = customer;

  const actions = [
    { action: 'setFirstName', firstName },
    { action: 'setLastName', lastName },
    { action: 'setDateOfBirth', dateOfBirth },
  ];

  try {
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/dino-land/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message) {
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      throw new Error('Error change profile information');
    } else {
      toast.success('Change successfull!');
    }
  } catch (error) {
    console.error('Error change profile information:', error);
    return null;
  }
};
