import { generatorRespError } from 'src/utils/handler';
import type { Handler } from 'src/types/next-handler';

const handler: Handler = (req, res) => {
  if (req.method !== 'GET')
    res.status(405).json(generatorRespError(`method ${req.method ?? ''} not supported`));

  const { NEXT_PUBLIC_HOME_TITLE, NEXT_PUBLIC_HOME_HEADER_TITLE, NEXT_PUBLIC_HOME_BLOG, NEXT_PUBLIC_HOME_TWITTER } = process.env;

  res.status(200).json({
    title: NEXT_PUBLIC_HOME_TITLE,
    headerTitle: NEXT_PUBLIC_HOME_HEADER_TITLE,
    blog: NEXT_PUBLIC_HOME_BLOG,
    twitter: NEXT_PUBLIC_HOME_TWITTER
  });
};

export default handler;
