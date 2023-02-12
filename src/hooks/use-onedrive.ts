import { useToasts } from '@geist-ui/core';

const authApi = 'https://login.microsoftonline.com/common/oauth2/v2.0';
const clientId = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_SECRET;
const scope = 'Files.ReadWrite offline_access';

export const useOnedrive = () => {
  const { setToast } = useToasts();

  const getCode = () => {
    window.open(`${authApi}/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent('http://localhost')}`, '_blank');
  };

  const getToken = async () => {
    const authToken = localStorage.getItem('onedrive-code');

    if (!authToken) {
      getCode();
      return;
    }

    // TODO error handler
    if (clientId === undefined || clientSecret === undefined) {
      return;
    }

    try {
      const res = await fetch(`${authApi}/token`, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          client_id: clientId,
          redirect_uri: document.location.href,
          client_secret: clientSecret,
          code: authToken,
          grant_type: 'authorization_code'
        })
      });

      const data = await res.json();

      if (!data) {
        throw new Error('fetching token failed');
      }

      console.info(data);
    } catch {
      setToast({
        text: '获取 onedrive token 失败',
        delay: 4000
      });
    }
  };

  const handleUpload = async () => {
    const token = await getToken();
  };

  return {
    handleUpload,
    handleSync: ''
  };
};
