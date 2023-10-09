import * as si from 'systeminformation';
import type { NextApiHandler } from 'next';

import { generatorRespError } from 'src/lib/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));
    return;
  }

  switch (req.query.type) {
    case 'cpuinfo':
      res.status(200).json({ usage: `${(await si.currentLoad()).currentLoad.toFixed(2)}%` });
      break;
    case 'meminfo':
      res.status(200).json({ free: `${((await si.mem()).free / (1024 ** 3)).toFixed(2)} GB` });
      break;
    default:
      res.status(400).json(generatorRespError('未知的请求类型'));
  }
};

export default handler;
