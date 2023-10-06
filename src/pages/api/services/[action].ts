import type { NextApiHandler } from 'next';
import type { Action } from 'src/types/next-handler';
import type { Service } from 'src/types/services';

import { generatorRespError } from 'src/lib/utils';
import { addServicesData, deleteServicesData, editServiceData, updateServiceData } from 'src/lib/services';

const addHandler: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as Service | undefined;

  if (!data) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  try {
    await addServicesData(data);
    res.status(200).json({ msg: `添加 ${data.name} 成功` });
  } catch {
    res.status(500).json(generatorRespError('服务器错误'));
  }
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(400).json(generatorRespError('删除的目标卡片名为空'));
    return;
  }

  try {
    await deleteServicesData(data);
    res.status(200).json({ msg: `删除 ${data} 成功` });
  } catch {
    res.status(500).json(generatorRespError('服务器错误'));
  }
};

const editHandler: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as Service & { oldName: string } | undefined;

  if (!data) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  try {
    await editServiceData(data);
    res.status(200).json({ msg: `编辑 ${data.oldName} 成功` });
  } catch {
    res.status(500).json(generatorRespError('服务器错误'));
  }
};

const updateHandler: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as Service[] | undefined;

  if (!data) {
    res.status(400).json(generatorRespError('数据不能为空'));
    return;
  }

  try {
    await updateServiceData(data);
    res.status(200).json({ msg: '更新成功' });
  } catch {
    res.status(500).json(generatorRespError('服务器错误'));
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
