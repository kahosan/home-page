import fs from 'fs/promises';
import path from 'path';

import type { Service } from 'src/types/services';

const filePath = process.env.FILE_PATH || `${path.resolve()}/services.json`;

const fileName = filePath.split('/').at(-1);

export const getServicesData = async () => {
  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const servicesData = JSON.parse(data) as Service[];

  if (Array.isArray(servicesData)) {
    for (const service of servicesData) {
      const keys = ['name', 'path', 'description', 'icon'];
      if (!(keys.every((key) => key in service)))
        throw new Error(`${fileName} 文件数据格式错误 ${keys.join(', ')} 为必填项`);

      for (const key in service) {
        if (typeof service[key as keyof Service] !== 'string')
          throw new TypeError(`${fileName} 文件数据格式错误 ${key} 的值必须为字符串`);
      }
    }
  } else {
    throw new TypeError(`${fileName} 数据格式应为数组`);
  }

  return servicesData;
};

export const addServicesData = async (service: Service) => {
  const servicesData = await getServicesData();
  servicesData.push(service);

  await fs.writeFile(filePath, JSON.stringify(servicesData, null, 2));
};

export const deleteServicesData = async (target: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.filter(service => service.name !== target);

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const editServiceData = async (service: Service, id: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.map((item) => {
    return item.name === id ? service : item;
  });

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
};

export const updateServiceData = async (services: Service[]) => {
  await fs.writeFile(filePath, JSON.stringify(services, null, 2));
};
