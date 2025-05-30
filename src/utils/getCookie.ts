export function getCookie(name: string) {
  const cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}
