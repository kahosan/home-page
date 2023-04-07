export const authApi = 'https://login.microsoftonline.com/common/oauth2/v2.0';
export const clientId = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID || '';
export const clientSecret = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_SECRET || '';
export const scope = 'Files.ReadWrite offline_access';
export const redirectUri = 'http://localhost';

const params = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  client_secret: clientSecret
});

export const getAuthCode = () => {
  window.open(`${authApi}/authorize?client_id=${clientId}&scope=${encodeURIComponent(scope)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`, '_blank');
};

export const getAuthTokenWithCode = async (code: string) => {
  params.append('code', code);
  params.append('grant_type', 'authorization_code');

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
  params.append('refresh_token', refreshToken);
  params.append('grant_type', 'refresh_token');

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
