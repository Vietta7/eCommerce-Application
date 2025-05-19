import { useState } from 'react';
import { getAuthToken } from '../services/authService';

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async (username: string, password: string) => {
    const newToken = await getAuthToken(username, password);
    setToken(newToken);
  };

  return { token, fetchToken };
};
