import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher, fetcherForUpdate } from 'src/lib/fetcher';

import { useToasts } from '@geist-ui/core';

import { resolveData, validateFormDataForService } from 'src/lib/utils';

import type { Service } from 'src/types/services';

export const useServices = () => {
  const { setToast } = useToasts();
  const ErrorEmit = (msg: string) => {
    setToast({
      text: msg,
      type: 'error',
      delay: 3000
    });
  };

  const { data: servicesData, mutate } = useSWR<Service[]>('/api/services', fetcher, {
    onError(e) {
      console.error(e);
    }
  });
  const { trigger } = useSWRMutation('/api/services/update', fetcherForUpdate, {
    onError(e) {
      ErrorEmit(e.msg);
    }
  });

  const handlerAddService = async (service: Service) => {
    // validate data
    const error = validateFormDataForService(service);
    if (error) {
      ErrorEmit(error);
      return;
    }

    await trigger([...resolveData(servicesData), service]);
    mutate();
    setToast({
      text: '添加成功',
      delay: 4000
    });
  };

  const handleDeleteService = async (name: string | string[]) => {
    const names = Array.isArray(name) ? name : [name];
    await trigger(resolveData(servicesData).filter(s => !names.includes(s.name)));
    mutate();
    setToast({
      text: '删除成功',
      delay: 4000
    });
  };

  const handleEditService = async (service: Service, id: string) => {
    // validate data
    const error = validateFormDataForService(service);
    if (error) {
      ErrorEmit(error);
      return;
    }

    await trigger(resolveData(servicesData).map(s => (s.name === id ? service : s)));
    mutate();
    setToast({
      text: '修改成功',
      delay: 4000
    });
  };

  const handleUpdateServices = async (services: Service[]) => {
    await trigger(services);
    mutate();
  };

  return {
    servicesData,
    handlerAddService,
    handleDeleteService,
    handleEditService,
    handleUpdateServices
  };
};
