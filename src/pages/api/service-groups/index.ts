import type { NextApiHandler } from 'next';

import { generatorRespError } from 'src/lib/utils';
import { getServiceGroups } from 'src/lib/services';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET')
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));

  try {
    res.status(200).json(await getServiceGroups());
  } catch (e) {
    if (e instanceof Error)
      res.status(500).json(generatorRespError(e.message));
  }
};

export default handler;
