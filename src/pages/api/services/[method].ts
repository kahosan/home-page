import type { EditMethod, Handler } from 'src/types/next-handler';
import type { Service } from 'src/types/services';

import { generatorRespError } from 'src/utils/handler';
import { addServicesData, delServicesData } from 'src/utils/services';

const addHandler: Handler = (req, res) => {
  const data = JSON.parse(req.body) as Service;

  if (!data) {
    res.status(400).json(generatorRespError('数据不能为空'));
  }

  addServicesData(data);
  res.status(200).json({ msg: `添加 ${data.name} 成功` });
};

const delHandler: Handler = (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(400).json(generatorRespError('删除的目标卡片名为空'));
  }

  delServicesData(data);
  res.status(200).json({ msg: `删除 ${data} 成功` });
};

const handler: Handler = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json(generatorRespError(`请求方法 ${req.method} 不支持`));
  } else {
    const editMethod = req.query.method as EditMethod;

    if (editMethod === 'add') {
      addHandler(req, res);
    } else if (editMethod === 'del') {
      delHandler(req, res);
    } else {
      res.status(400).json(generatorRespError(`不支持 ${editMethod} 方法`));
    }
  }
};

export default handler;
