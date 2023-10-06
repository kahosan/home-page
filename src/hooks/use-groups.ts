import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher, fetcherForUpdate } from 'src/lib/fetcher';
import type { Service, ServiceGroup } from 'src/types/services';

import { useToasts } from '@geist-ui/core';
import { resolveData, validateFormDataForService } from 'src/lib/utils';
import { useServices } from './use-services';

export const useGroups = () => {
  const { setToast } = useToasts();
  const { handleDeleteService } = useServices();

  const { data: groups, mutate } = useSWR<ServiceGroup[]>('/api/service-groups', fetcher, {
    onError(e) {
      console.error(e.msg);
    }
  });
  const { trigger } = useSWRMutation('/api/service-groups/update', fetcherForUpdate, {
    onError(e) {
      setToast({
        text: e.msg,
        type: 'error',
        delay: 3000
      });
    }
  });

  const createGroup = async (group: ServiceGroup, remove: boolean) => {
    if (remove)
      await handleDeleteService(group.services.map(s => s.name));

    await trigger([...resolveData(groups), group]);

    mutate();
    setToast({
      text: '创建分组成功'
    });
  };

  const deleteGroup = async (name: string) => {
    await trigger(resolveData(groups).filter(s => s.name !== name));
    mutate();
    setToast({
      text: '删除成功',
      delay: 4000
    });
  };

  const deleteGroupService = async (groupName: string, services: string | string[]) => {
    const names = Array.isArray(services) ? services : [services];
    const data = resolveData(groups).map(group => (
      group.name === groupName
        ? {
          ...group,
          services: group.services.filter(s => !names.includes(s.name))
        }
        : group
    ));

    await trigger(data);
    mutate();
    setToast({
      text: '删除成功',
      delay: 4000
    });
  };

  const editGroup = async (name: string, id: string) => {
    await trigger(resolveData(groups).map(s => (s.name === id ? { ...s, name } : s)));
    mutate();

    setToast({
      text: '修改成功',
      delay: 4000
    });
  };

  const editGroupService = async (groupName: string, service: Service, id: string) => {
    const error = validateFormDataForService(service);
    if (error) {
      setToast({
        text: error,
        type: 'error',
        delay: 3000
      });
      return;
    }

    const data = resolveData(groups).map(group => (
      group.name === groupName
        ? {
          ...group,
          services: group.services.map(s => (
            s.name === id
              ? service
              : s
          ))
        }
        : group
    ));

    await trigger(data);
    mutate();
    setToast({
      text: '修改成功',
      delay: 4000
    });
  };

  const addGroupService = async (groupName: string, service: Service) => {
    const error = validateFormDataForService(service);
    if (error) {
      setToast({
        text: error,
        type: 'error',
        delay: 3000
      });
      return;
    }

    const data = resolveData(groups).map(group => (
      group.name === groupName
        ? {
          ...group,
          services: [...group.services, service]
        }
        : group
    ));

    await trigger(data);
    mutate();
    setToast({
      text: '添加成功',
      delay: 4000
    });
  };

  const updateGroups = async (groups: ServiceGroup[]) => {
    await trigger(groups);
    mutate();
  };

  return {
    groups,
    createGroup,
    deleteGroup,
    deleteGroupService,
    editGroup,
    editGroupService,
    addGroupService,
    updateGroups
  };
};
