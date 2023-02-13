export interface AccessTokenWrapper {
  expires: number
  token: string
}

export const useOnedriveLS = () => {
  return {
    get authCode() {
      return localStorage.getItem('onedrive-auth-code') ?? '';
    },
    set authCode(code: string) {
      localStorage.setItem('onedrive-auth-code', code);
    },
    removeAuthCode() {
      localStorage.removeItem('onedrive-auth-code');
    },
    get refreshToken() {
      return localStorage.getItem('onedrive-refresh-token') ?? '';
    },
    set refreshToken(refreshToken: string) {
      localStorage.setItem('onedrive-refresh-token', refreshToken);
    },
    removeRefreshToken() {
      localStorage.removeItem('onedrive-refresh-token');
    },
    get accessToken() {
      return JSON.parse(localStorage.getItem('onedrive-access-token') ?? '{}') as AccessTokenWrapper;
    },
    set accessToken(accessToken: AccessTokenWrapper) {
      localStorage.setItem('onedrive-access-token', JSON.stringify(accessToken));
    },
    calcAccessTokenExpires(expires: number) {
      return new Date().getTime() + expires * 1000;
    },
    removeAccessToken() {
      localStorage.removeItem('onedrive-access-token');
    }
  };
};
