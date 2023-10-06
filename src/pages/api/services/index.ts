import type { NextApiHandler } from 'next';
import { generatorRespError } from 'src/lib/utils';
import { getServicesData } from 'src/lib/services';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET')
    res.status(405).json(generatorRespError(`method ${req.method ?? ''} not supported`));
  else
    res.status(200).json(await getServicesData());
};

export default handler;
