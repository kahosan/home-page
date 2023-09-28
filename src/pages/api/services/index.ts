import type { NextApiHandler } from 'next';
import { generatorRespError } from 'src/utils/handler';
import { getServicesData } from 'src/utils/services';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET')
    res.status(405).json(generatorRespError(`method ${req.method ?? ''} not supported`));
  else
    res.status(200).json(await getServicesData());
};

export default handler;
