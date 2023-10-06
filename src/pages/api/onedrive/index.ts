import type { NextApiHandler } from 'next';

import { generatorRespError } from 'src/lib/utils';
import { getAuthTokenWithCode, getAuthTokenWithRefreshToken } from 'src/lib/onedrive-auth';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));
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
    res.status(400).json(generatorRespError('code 或 refresh_token 不能为空'));
  }
};

export default handler;
