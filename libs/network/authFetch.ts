import { getToken } from './authTokenProvider';

export const authFetch: typeof fetch = async (uri, options = {}) => {
  const headers = new Headers((options as RequestInit).headers);
  const token = await getToken();

  if (token) headers.set('Authorization', `Bearer ${token}`);

  return fetch(uri, { ...options, headers });
};
