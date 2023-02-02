import { atom, useAtom } from 'jotai';

export const isEditAtom = atom(false);

export const useEditServices = () => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);

  const toggleEditMode = () => setIsEdit(!isEdit);

  const handleDeleteService = (targetName: string) => {

  };

  return {
    isEdit,
    toggleEditMode,
    handleDeleteService
  };
};
