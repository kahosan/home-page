import type { NextApiHandler } from 'next';
import type { Service } from 'src/types/services';

import { generatorRespError } from 'src/lib/utils';
import { updateServiceData } from 'src/lib/services';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));
    return;
  }

  try {
    const data = JSON.parse(req.body || '[]') as Service[] | undefined;
    if (!data) {
      res.status(400).json(generatorRespError('数据不能为空'));
      return;
    }

    await updateServiceData(data);
    res.status(200).json({ msg: '更新成功' });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json(generatorRespError(e.message));
    }
  }
};

export default handler;
