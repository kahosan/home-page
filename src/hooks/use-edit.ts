import { atom, useAtom } from 'jotai';

export const isEditAtom = atom(false);

export const useEdit = () => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const toggleEditMode = () => setIsEdit(!isEdit);

  return {
    isEdit,
    toggleEditMode
  };
};
