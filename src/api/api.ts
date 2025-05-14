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
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  if (!token) {
    return false;
  }

  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/dino-land/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.ok;
}
