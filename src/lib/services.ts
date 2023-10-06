import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import type { Service, ServiceGroup } from 'src/types/services';

const servicesFilePath = process.env.SERVICES_FILE_PATH || `${path.resolve()}/services.json`;
const serviceGroupsFilePath = process.env.SERVICE_GROUPS_FILE_PATH || `${path.resolve()}/service-groups.json`;

if (!existsSync(servicesFilePath)) fs.writeFile(servicesFilePath, '[]');
if (!existsSync(serviceGroupsFilePath)) fs.writeFile(serviceGroupsFilePath, '[]');

export const getServicesData = async () => {
  const data = await fs.readFile(servicesFilePath, { encoding: 'utf-8' });
  return JSON.parse(data) as Service[];
};

export const updateServiceData = async (services: Service[]) => {
  await fs.writeFile(servicesFilePath, JSON.stringify(services, null, 2));
};

export const getServiceGroups = async () => {
  const data = await fs.readFile(serviceGroupsFilePath, { encoding: 'utf-8' });
  return JSON.parse(data) as ServiceGroup[];
};

export const updateServiceGroups = async (serviceGroups: ServiceGroup[]) => {
  await fs.writeFile(serviceGroupsFilePath, JSON.stringify(serviceGroups, null, 2));
};
