import { useToasts } from '@geist-ui/core';

import { atom, useAtom } from 'jotai';
import { useServices } from './use-services';

import { validateFormDataForService } from 'src/lib/utils';

import type { Service } from 'src/types/services';

export const isEditAtom = atom(false);

export const useEditServices = () => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const { setToast } = useToasts();
  const { update } = useServices();

  const toggleEditMode = () => setIsEdit(!isEdit);

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
      const res = await fetch('/api/services/add', { method: 'POST', body: JSON.stringify(service) });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      closeModal();
      // refetch data
      update();

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

      if (!res.ok) {
        throw new Error(data.msg);
      }

      // refetch data
      update();
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

      if (!res.ok) {
        throw new Error(data.msg);
      }

      closeModal();
      // refetch data
      update();

      setToast({
        text: data.msg,
        delay: 4000
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    isEdit,
    toggleEditMode,
    handleDeleteService,
    handlerAddService,
    handleEditService
  };
};
