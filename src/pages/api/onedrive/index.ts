import type { Handler } from 'src/types/next-handler';

import { generatorRespError } from 'src/utils/handler';
import { getAuthTokenWithCode, getAuthTokenWithRefreshToken } from 'src/utils/onedrive-auth';

const handler: Handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`method ${req.method ?? ''} not supported`));
    return;
  }

  const { code, refresh_token } = req.query as { [key: string]: string };
  if (refresh_token) { // if refresh_token is provided, use it to get new access_token
    try {
      const data = await getAuthTokenWithRefreshToken(refresh_token);
      res.json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  } else if (code) {
    try {
      const data = await getAuthTokenWithCode(code);
      res.json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(400).json(generatorRespError('code or refresh_token is required'));
  }
};

export default handler;
