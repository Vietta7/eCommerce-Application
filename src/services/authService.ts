import axios from 'axios';
const API_URL = 'https://dino-land.netlify.app/api/login';

interface AuthResponse {
  access_token: string;
}

export const getAuthToken = async (username: string, password: string): Promise<string | null> => {
  try {
    const response = await axios.post<AuthResponse>(
      API_URL,
      {
        username,
        password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Ошибка получения токена:', error);
    return null;
  }
};
