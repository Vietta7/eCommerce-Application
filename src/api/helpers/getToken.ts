// TODO: update into getCookie function and deprecate this file
export const getToken = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
};
