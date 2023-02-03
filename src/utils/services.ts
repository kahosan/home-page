import fs from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import type { Service } from 'src/types/services';

const filePath = process.env.FILE_PATH ? tmpdir() + process.env.FILE_PATH : `${path.resolve()}/services.json`;

export const getServicesData = () => {
  try {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(data) as Service[];
  } catch {
    return [];
  }
};

export const addServicesData = (service: Service) => {
  const servicesData = getServicesData();
  servicesData.push(service);

  fs.writeFileSync(filePath, JSON.stringify(servicesData, null, 2));
};

export const delServicesData = (target: string) => {
  const servicesData = getServicesData();
  const newData = servicesData.filter(service => service.name !== target);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
};
