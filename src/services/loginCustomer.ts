import { FormData } from '../types/user/formData';

export const loginCustomer = async (data: FormData) => {
  try {
    const resToken = await fetch('https://dino-land.netlify.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });

    const { access_token: accessToken } = await resToken.json();
    document.cookie = `access_token=${accessToken}; path=/`;
    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
