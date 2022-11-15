import { atom, useAtom } from 'jotai';

const editAtom = atom(false);

export function useEditServices() {
  const [edit, setEdit] = useAtom(editAtom);

  const handleAddService = () => {
    // TODO
  };

  return {
    edit,
    setEdit,
    handleAddService
  };
}
