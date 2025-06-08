import { useEffect, useState } from 'react';

interface UseAccessTokenResult {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const useAccessToken = (): UseAccessTokenResult => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const clientId = import.meta.env.VITE_COMMERCETOOLS_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_COMMERCETOOLS_CLIENT_SECRET;
        const projectKey = import.meta.env.VITE_COMMERCETOOLS_PROJECT_KEY;

        const authString = btoa(`${clientId}:${clientSecret}`);

        const response = await fetch(
          `https://auth.europe-west1.gcp.commercetools.com/oauth/token`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${authString}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'client_credentials',
              scope: `view_products:${projectKey}`,
            }),
          },
        );

        if (!response.ok) throw new Error('Ошибка получения токена');

        const data = await response.json();
        setToken(data.access_token);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Не удалось получить токен');
        } else {
          setError('Неизвестная ошибка');
        }
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};

export default useAccessToken;
