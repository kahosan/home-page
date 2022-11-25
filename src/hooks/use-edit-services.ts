import { atom, useAtom } from 'jotai';

import serviceJSON from '../../services.json';

import { useGithubApi, useGithubUserInfo } from './use-github-api';
import { useIsGithubPages } from './use-is-github-pages';
import { useServiceData } from './use-service-data';
import { useToasts } from './use-toasts';

import type { ServiceData } from '@/types/service-card';

const editModeAtom = atom(false);

export function useEditServices() {
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const [services, setServices] = useServiceData();

  const { setToast } = useToasts();

  const isGithubPages = useIsGithubPages();
  const [githubUserInfo] = useGithubUserInfo();
  const { handleUpdateData } = useGithubApi();

  const handleAddService = (newApp: ServiceData) => {
    if (newApp.name !== '') {
      setServices(service => [...service, newApp]);
    } else {
      setToast({
        text: '添加的应用不能是空的',
        type: 'error',
        delay: 3000
      });
    }
  };

  const handleDeleteService = (name: string) => {
    setServices(services => services.filter(service => service.name !== name));
  };

  const handleRestoreService = () => {
    setServices(serviceJSON);
  };

  const handleSaveService = () => {
    handleUpdateData(services);
  };

  const toggleEditMode = () => {
    if (isGithubPages && !githubUserInfo?.token) {
      setToast({
        text: '请先填写 token 等信息，点击右上角的 Github 图标',
        type: 'error',
        delay: 3000
      });
      return;
    }

    setEditMode(!editMode);
  };

  return {
    editMode,
    toggleEditMode,
    handleAddService,
    handleDeleteService,
    handleRestoreService,
    handleSaveService
  };
}
