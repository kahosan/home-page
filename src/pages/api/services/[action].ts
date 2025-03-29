// eslint-disable-next-line @eslint-react/naming-convention/filename -- ignore
import type { NextApiHandler } from 'next';
import type { Action } from 'src/types/next-handler';
import type { Service } from 'src/types/services';

import { generatorRespError } from 'src/lib/utils';
import { addServicesData, deleteServicesData, editServiceData, updateServiceData } from 'src/lib/services';

const addHandler: NextApiHandler = async (req, res) => {
  if (!req.body) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  const data = req.body as Service;

  try {
    await addServicesData(data);
    res.status(200).json({ msg: `添加 ${data.name} 成功` });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).json(generatorRespError(e.message));
  }
};

const deleteHandler: NextApiHandler = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json(generatorRespError('删除的目标卡片名为空'));
    return;
  }

  const { name } = req.body as { name: string };

  try {
    await deleteServicesData(name);
    res.status(200).json({ msg: `删除 ${name} 成功` });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).json(generatorRespError(e.message));
  }
};

const editHandler: NextApiHandler = async (req, res) => {
  if (!req.body) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  const data = req.body as { newData: Service, id: string };

  try {
    await editServiceData(data.newData, data.id);
    res.status(200).json({ msg: `编辑 ${data.id} 成功` });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).json(generatorRespError(e.message));
  }
};

const updateHandler: NextApiHandler = async (req, res) => {
  if (!req.body) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  const data = req.body as Service[];

  try {
    await updateServiceData(data);
    res.status(200).json({ msg: '更新成功' });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).json(generatorRespError(e.message));
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method ?? ''} 不支持`));
    return;
  }

  const action = req.query.action as Action;
  switch (action) {
    case 'add':
      await addHandler(req, res);
      break;
    case 'delete':
      await deleteHandler(req, res);
      break;
    case 'edit':
      await editHandler(req, res);
      break;
    case 'update':
      await updateHandler(req, res);
      break;
    default:
      res.status(400).json(generatorRespError('未知操作'));
  }
};

export default handler;
