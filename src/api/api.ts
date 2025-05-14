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

  const { access_token: accessToken } = await resToken.json();
  document.cookie = `access_token=${accessToken}; path=/`;
}
