import useSWR from 'swr';
import { fetcher } from 'src/lib/fetcher';

import { useToasts } from '@geist-ui/core';

import { validateFormDataForService } from 'src/lib/utils';

import type { Service } from 'src/types/services';

export const useServices = () => {
  const { data: servicesData, mutate } = useSWR<Service[]>('/api/services', fetcher, {
    onError(e) {
      console.error(e);
    }
  });

  const { setToast } = useToasts();

  const errorHandler = (e: unknown) => {
    if (e instanceof Error) {
      setToast({
        text: e.message,
        type: 'error',
        delay: 3000
      });

      console.error(e);
    }
  };

  const handlerAddService = async (service: Service | undefined, closeModal: () => void) => {
    // validate data
    const error = validateFormDataForService(service);

    if (error) {
      setToast({
        text: error,
        type: 'error',
        delay: 4000
      });
      return;
    }

    try {
      const res = await fetch('/api/services/add', { method: 'POST', body: JSON.stringify(service) });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.msg);

      closeModal();
      // refetch data
      mutate();
      setToast({
        text: data.msg,
        delay: 4000
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleDeleteService = async (targetName: string) => {
    try {
      const res = await fetch('/api/services/delete', { method: 'POST', body: targetName });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.msg);

      // refetch data
      mutate();
      setToast({
        text: data.msg,
        delay: 4000
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleEditService = async (service: Service & { oldName: string }, closeModal: () => void) => {
    // validate data
    const result = validateFormDataForService(service);

    if (result) {
      setToast({
        text: result,
        type: 'error',
        delay: 4000
      });
      return;
    }

    try {
      const res = await fetch('/api/services/edit', { method: 'POST', body: JSON.stringify(service) });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.msg);

      closeModal();
      // refetch data
      mutate();
      setToast({
        text: data.msg,
        delay: 4000
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleUpdateServices = async (services: Service[]) => {
    try {
      const res = await fetch('/api/services/mutate', { method: 'POST', body: JSON.stringify(services) });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.msg);

      // refetch data
      mutate();
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    servicesData,
    handlerAddService,
    handleDeleteService,
    handleEditService,
    handleUpdateServices
  };
};
