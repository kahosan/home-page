import { TITLE, HEADER_TITLE, BLOG, TWITTER } from 'src/lib/constant';

import { generatorRespError } from 'src/lib/utils';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method !== 'GET')
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));

  res.status(200).json({
    title: TITLE,
    headerTitle: HEADER_TITLE,
    blog: BLOG,
    twitter: TWITTER
  });
};

export default handler;
