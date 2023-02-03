import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import type { Service } from 'src/types/services';

const filePath = process.env.FILE_PATH || `${path.resolve()}/services.json`;

export const getServicesData = async () => {
  return JSON.parse(await readFile(filePath, { encoding: 'utf-8' })) as Service[];
};

export const addServicesData = async (service: Service) => {
  const servicesData = await getServicesData();
  servicesData.push(service);

  await writeFile(filePath, JSON.stringify(servicesData, null, 2));
};

export const delServicesData = async (target: string) => {
  const servicesData = await getServicesData();
  const newData = servicesData.filter(service => service.name !== target);

  await writeFile(filePath, JSON.stringify(newData, null, 2));
};
