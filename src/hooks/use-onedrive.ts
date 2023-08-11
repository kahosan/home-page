import { useState } from 'react';
import { useToasts } from '@geist-ui/core';

import { calcAccessTokenExpires, useOnedriveData } from './use-onedrive-data';
import { useEditServices } from './use-edit-services';
import type { Service } from 'src/types/services';

import { HTTPError, fetcherWithAuthorization } from 'src/lib/fetcher';
import { CLIENT_ID, CLIENT_SECRET } from 'src/lib/constant';

import type { RequestTokenResponse, ResourceError, UploadResponse } from 'src/types/onedrive';

export const useOnedrive = () => {
  const { setToast } = useToasts();

  const [onedriveData, setOnedriveData] = useOnedriveData();
  const { handleUpdateServices } = useEditServices();

  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const requestTokenHandler = async (query: string): Promise<string | undefined> => {
    try {
      const res = await fetch(`/api/onedrive?${query}`, { method: 'POST' });
      const data = await res.json() as RequestTokenResponse;
      if (!res.ok)
        throw data;

      // 将 token 数据保存在本地
      setOnedriveData({
        ...onedriveData,
        accessToken: {
          token: data.access_token,
          expires: calcAccessTokenExpires(data.expires_in)
        },
        refreshToken: data.refresh_token
      });

      return data.access_token;
    } catch (e) {
      setOnedriveData({
        accessToken: {
          token: '',
          expires: 0
        },
        authCode: '',
        refreshToken: ''
      });

      setToast({
        text: '获取 onedrive token 失败，请重新获取 code',
        type: 'error',
        delay: 4000
      });

      console.error(e);
    }
  };

  const getToken = async () => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      setToast({ text: 'client id 和 client secret 不存在', type: 'error', delay: 4000 });
      return;
    }

    if (onedriveData.accessToken.expires > new Date().getTime())
      return onedriveData.accessToken.token;

    // 如果存在 refresh token 使用它来刷新 token
    if (onedriveData.refreshToken)
      return requestTokenHandler(`refresh_token=${onedriveData.refreshToken}`);

    if (!onedriveData.authCode) {
      setToast({ text: 'auth code 不存在', type: 'error', delay: 4000 });
      return;
    }

    // 使用 code 获取令牌
    return requestTokenHandler(`code=${onedriveData.authCode}`);
  };

  const handleUpload = async (services: Service[] | undefined) => {
    setIsUploading(true);
    const token = await getToken();

    if (!token) {
      setIsUploading(false);
      setToast({ text: 'token 不存在', type: 'error', delay: 4000 });
      return;
    }

    if (services === undefined || services.length === 0) {
      setIsUploading(false);
      setToast({ text: 'services 数据不存在', type: 'error', delay: 4000 });
      return;
    }

    const requestOptions: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(services),
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      await fetcherWithAuthorization<UploadResponse>([encodeURIComponent('root:/services.json:/content'), token], requestOptions);
      setIsUploading(false);
      setToast({ text: '更新成功' });
    } catch (e) {
      setIsUploading(false);
      if (e instanceof HTTPError) {
        const errorInfo = e.info as ResourceError;
        setToast({ text: `更新失败: ${errorInfo.error.message}`, type: 'error', delay: 4000 });
      }
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    const token = await getToken();

    if (!token) {
      setIsSyncing(false);
      setToast({ text: 'token 不存在', type: 'error', delay: 4000 });
      return;
    }

    try {
      const data = await fetcherWithAuthorization<Service[]>([encodeURIComponent('root:/services.json:/content'), token], { method: 'GET' });
      handleUpdateServices(data);

      setIsSyncing(false);
      setToast({ text: '同步成功' });
    } catch (e) {
      setIsSyncing(false);
      if (e instanceof HTTPError) {
        const errorInfo = e.info as ResourceError;
        setToast({ text: `同步失败: ${errorInfo.error.message}`, type: 'error', delay: 4000 });
      }
    }
  };

  return {
    isSyncing,
    isUploading,
    handleUpload,
    handleSync
  };
};
