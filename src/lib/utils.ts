import type { Service } from 'src/types/services';

export const isBrowser = typeof window !== 'undefined';

export function validateFormDataForService(service: Service | undefined) {
  if (!service)
    return '请填写所需数据';

  for (const [k, v] of Object.entries(service)) {
    if (!v)
      return `${k} 没有填写`;
  }
}
export const generatorRespError = (msg: string) => ({ msg });
