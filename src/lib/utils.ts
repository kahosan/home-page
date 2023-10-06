import type { Service } from 'src/types/services';

export const isBrowser = typeof window !== 'undefined';

export const validateFormDataForService = (service: Service) => {
  for (const [k, v] of Object.entries(service)) {
    if (!v)
      return `${k} 没有填写`;
  }
};

export const generatorRespError = (msg: string) => ({ msg });

export const resolveData = <T>(data: T[] | undefined) => {
  if (data === undefined || data.length === 0)
    return [];

  return data;
};
