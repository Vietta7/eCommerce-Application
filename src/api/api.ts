import { ProductPagedQueryResponse, ProductProjection } from '@commercetools/platform-sdk';
import { getToken } from './helpers/getToken';

export async function logIn(props: { email: string; password: string }) {
  const { email, password } = props;
  const resToken = await fetch('https://dino-land.netlify.app/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  const data = await resToken.json();

  if (!resToken.ok) {
    throw new Error(data.message || 'Ошибка авторизации');
  }

  const { access_token: accessToken } = data;
  document.cookie = `access_token=${accessToken}; path=/`;

  return accessToken;
}

export function logout() {
  document.cookie = 'refresh_token=; ';
}

export async function checkAuth(): Promise<boolean> {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/dino-land/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.ok;
}

export async function getProducts(): Promise<ProductPagedQueryResponse> {
  try {
    const token = getToken();

    const res = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/product-projections?limit=100`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMsg = errorData.message || `HTTP error ${res.status}`;
      throw new Error(errorMsg);
    }

    const data = (await res.json()) as ProductPagedQueryResponse;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}

export async function getProduct(token: string, id: string): Promise<ProductProjection> {
  try {
    const res = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/product-projections/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMsg = errorData.message || `HTTP error ${res.status}`;
      throw new Error(errorMsg);
    }

    const data = (await res.json()) as ProductProjection;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error during login via');
    }
  }
}
