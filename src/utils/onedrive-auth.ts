import { CLIENT_ID, CLIENT_SECRET } from 'src/lib/constant';

export const authApi = 'https://login.microsoftonline.com/common/oauth2/v2.0';
export const scope = 'Files.ReadWrite offline_access';
export const redirectUri = 'http://localhost';

export const getAuthCode = () => {
  window.open(`${authApi}/authorize?client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`, '_blank');
};

const initParams = (params: Record<string, string>) => new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: redirectUri,
  client_secret: CLIENT_SECRET,
  ...params
});

export const getAuthTokenWithCode = async (code: string) => {
  const params = initParams({ code, grant_type: 'authorization_code' });

  const res = await fetch(`${authApi}/token`, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const data = await res.json();

  if (!res.ok)
    throw data;

  return data;
};

export const getAuthTokenWithRefreshToken = async (refreshToken: string) => {
  const params = initParams({ refresh_token: refreshToken, grant_type: 'refresh_token' });

  const res = await fetch(`${authApi}/token`, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const data = await res.json();

  if (!res.ok)
    throw data;

  return data;
};
