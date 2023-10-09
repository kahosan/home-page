import useSWR from 'swr';
import { fetcher, fetcherWithJSON } from 'src/lib/fetcher';

import { useToasts } from '@geist-ui/core';

import { validateFormDataForService } from 'src/lib/utils';

import type { ActionsResponse, Service } from 'src/types/services';

export const useServices = () => {
  const { setToast } = useToasts();
  const handleError = (message: string) => {
    setToast({
      text: message,
      type: 'error',
      delay: 3000
    });
  };

  const { data: servicesData, mutate } = useSWR<Service[]>('/api/services', fetcher, {
    onError(e) {
      if (e instanceof Error) {
        const message = `获取数据出错: ${e.message}`;

        handleError(message);
        console.error(message);
      }
    }
  });

  const handlerAddService = async (service: Service, closeModal: () => void) => {
    // validate data
    const error = validateFormDataForService(service);
    if (error) {
      handleError(error);
      return;
    }

    try {
      const data = await fetcherWithJSON<ActionsResponse>('/api/services/add', { method: 'POST', body: JSON.stringify(service) });

      closeModal();
      // refetch data
      mutate();
      setToast({ text: data.msg });
    } catch (e) {
      if (e instanceof Error) {
        const message = `添加服务出错: ${e.message}`;
        handleError(message);
      }
    }
  };

  const handleDeleteService = async (name: string) => {
    try {
      const data = await fetcherWithJSON<ActionsResponse>('/api/services/delete', { method: 'POST', body: JSON.stringify({ name }) });

      // refetch data
      mutate();
      setToast({ text: data.msg });
    } catch (e) {
      if (e instanceof Error) {
        const message = `删除服务出错: ${e.message}`;
        handleError(message);
      }
    }
  };

  const handleEditService = async (service: Service, id: string, closeModal: () => void) => {
    // validate data
    const error = validateFormDataForService(service);
    if (error) {
      handleError(error);
      return;
    }

    try {
      const data = await fetcherWithJSON<ActionsResponse>('/api/services/edit', { method: 'POST', body: JSON.stringify({ newData: service, id }) });

      closeModal();
      // refetch data
      mutate();
      setToast({ text: data.msg });
    } catch (e) {
      if (e instanceof Error) {
        const message = `编辑服务出错: ${e.message}`;
        handleError(message);
      }
    }
  };

  const handleUpdateServices = async (services: Service[]) => {
    try {
      await fetcherWithJSON<ActionsResponse>('/api/services/update', { method: 'POST', body: JSON.stringify(services) });

      // refetch data
      mutate();
    } catch (e) {
      if (e instanceof Error) {
        const message = `更新服务出错: ${e.message}`;
        handleError(message);
      }
    }
  };

  return {
    servicesData: Array.isArray(servicesData) ? servicesData : [],
    handlerAddService,
    handleDeleteService,
    handleEditService,
    handleUpdateServices
  };
};
