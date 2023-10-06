import type { NextApiHandler } from 'next';
import type { ServiceGroup } from 'src/types/services';

import { generatorRespError } from 'src/lib/utils';
import { updateServiceGroups } from 'src/lib/services';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));
    return;
  }

  try {
    const data = JSON.parse(req.body || '[]') as ServiceGroup[] | undefined;
    if (!data || data.length === 0) {
      res.status(400).json(generatorRespError('数据不能为空'));
      return;
    }

    await updateServiceGroups(data);
    res.status(200).json({ msg: '更新成功' });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json(generatorRespError(e.message));
    }
  }
};

export default handler;
