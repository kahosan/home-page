import { useToasts } from '@geist-ui/core';

import { useOnedriveLS } from './use-onedrive-ls';
import type { Service } from 'src/types/services';

import { clientId, clientSecret, getAuthCode } from 'src/utils/onedrive-auth';
import type { RequestTokenError, RequestTokenResponse } from 'src/types/onedrive';

export const useOnedrive = () => {
  const { setToast } = useToasts();
  const verifyData = useOnedriveLS();

  const requestTokenHandler = async (query: string) => {
    try {
      const res = await fetch(`/api/onedrive?${query}`, { method: 'POST' });
      const data = await res.json() as RequestTokenResponse;
      if (!res.ok) {
        throw data;
      }

      // 将 token 数据保存在本地
      verifyData.accessToken = {
        token: data.access_token,
        expires: verifyData.calcAccessTokenExpires(data.expires_in)
      };

      verifyData.refreshToken = data.refresh_token;
    } catch (e) {
      setToast({
        text: `获取 onedrive token 失败，请重新获取 Code ${(e as RequestTokenError).error_description}`,
        delay: 4000
      });

      console.error(e);
      verifyData.removeAuthCode();
    }
  };

  const getToken = async () => {
    // TODO error handler
    if (clientId === undefined || clientSecret === undefined) {
      return;
    }

    if (verifyData.accessToken.expires > new Date().getTime()) {
      return verifyData.accessToken.token;
    }

    // 如果存在 refresh token 使用它来刷新 token
    if (verifyData.refreshToken) {
      requestTokenHandler(`refresh_token=${verifyData.refreshToken}`);
      return verifyData.accessToken.token;
    }

    if (verifyData.authCode === '') {
      getAuthCode();
      return;
    }

    // 使用 code 获取令牌
    requestTokenHandler(`code=${verifyData.authCode}`);
    return verifyData.accessToken.token;
  };

  const handleUpload = async (services: Service[] | undefined) => {
    const token = await getToken();

    if (services === undefined || services.length === 0) {
      setToast({ text: '上传数据出错', delay: 4000 });
    }
  };

  return {
    handleUpload,
    handleSync: () => {}
  };
};
