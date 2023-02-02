import type { EditMethod, Handler } from 'src/types/next-handler';
import type { Service } from 'src/types/services';

import { generatorRespError } from 'src/utils/handler';
import { addServicesData, delServicesData } from 'src/utils/services';

const addHandler: Handler = async (req, res) => {
  const data = req.body as Service;

  if (!data) {
    res.status(400).json(generatorRespError('service data cannot be empty'));
  }

  await addServicesData(data);
  res.status(200).json({ msg: `add ${data.name} success` });
};

const delHandler: Handler = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(400).json(generatorRespError('target cannot be empty'));
  }

  await delServicesData(data);
  res.status(200).json({ msg: `del ${data} success` });
};

const handler: Handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`method ${req.method} not supported`));
  } else {
    const editMethod = req.query.method as EditMethod;

    if (editMethod === 'add') {
      addHandler(req, res);
    } else if (editMethod === 'del') {
      delHandler(req, res);
    } else {
      res.status(400).json(generatorRespError(`edit method ${editMethod} not supported`));
    }
  }
};

export default handler;
