import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Input, Loading, Modal, Spacer, useModal } from '@geist-ui/core';

import clsx from 'clsx';

import { useEdit } from 'src/hooks/use-edit';
import { useGroups } from 'src/hooks/use-groups';

import DataView from './data-view';
import Link from '../link';

import type { Service } from 'src/types/services';

interface GroupHeaderProps {
  groupName: string
  handleChangeName: (name: string, id: string) => void
  handleAddService: (groupName: string, service: Service) => void
  handleDeleteGroup: (name: string) => void
}

function GroupHeader({ groupName, handleChangeName, handleAddService, handleDeleteGroup }: GroupHeaderProps) {
  const { isEdit } = useEdit();
  const { visible, setVisible } = useModal();

  const [name, setName] = useState<string>('');

  const [service, setService] = useState<Service>({
    name: '',
    description: '',
    path: '',
    icon: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Service) => {
    setService(s => ({ ...s, [key]: e.target.value }));
  };

  const toggleEditMode = () => setVisible(p => !p);
  return (
    <div className="mb-5">
      <div className="flex gap-2 items-center">
        {isEdit
          ? (
            <Input
              onChange={e => setName(e.target.value)}
              initialValue={groupName}
              iconRight={<div className="text-3.5 i-carbon-checkmark" />}
              iconClickable
              onIconClick={() => handleChangeName(name, groupName)}
            />
          )
          : (
            <h3 className="mb-0 font-bold">{groupName}</h3>
          )}
        <div onClick={() => toggleEditMode()} className={clsx(' i-carbon-task-add text-5 cursor-pointer icon-tap-color opacity-animation-3', isEdit ? 'op-100' : 'op-0 hidden')} />
        <div onClick={() => handleDeleteGroup(groupName)} className={clsx(' i-carbon-trash-can text-5 cursor-pointer icon-tap-color opacity-animation-3', isEdit ? 'op-100' : 'op-0 hidden')} />
        <Modal visible={visible} disableBackdropClick>
          <Modal.Title>添加卡片</Modal.Title>
          <Modal.Subtitle>所有选项都必填</Modal.Subtitle>
          <Modal.Content className="!mx-auto">
            <Input label="名称" onChange={e => handleChange(e, 'name')} />
            <Spacer />
            <Input label="描述" onChange={e => handleChange(e, 'description')} />
            <Spacer />
            <Input label="路径" onChange={e => handleChange(e, 'path')} />
            <Spacer />
            <Input label="图标" onChange={e => handleChange(e, 'icon')} />
            <div className="text-center text-sm mt-2">
              Tip:
              <Link href="https://icones.js.org/collection/carbon" target="_blank">跳转到选择图标的页面</Link>
            </div>
          </Modal.Content>
          <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
          <Modal.Action onClick={() => {
            handleAddService(groupName, service);
            setVisible(false);
          }}>提交</Modal.Action>
        </Modal>
      </div>
    </div>
  );
}

export default function DataGroup() {
  const { groups, deleteGroupService, editGroupService, editGroup, deleteGroup, addGroupService } = useGroups();
  if (!groups || groups.length === 0) return <Loading />;

  return (
    <>
      {groups.map(group => (
        <div key={group.name} className="mb-5">
          <GroupHeader groupName={group.name} handleChangeName={editGroup} handleAddService={addGroupService} handleDeleteGroup={deleteGroup} />
          <DataView
            servicesData={group.services}
            handleDelete={name => deleteGroupService(group.name, name)}
            handleEdit={(service, id) => editGroupService(group.name, service, id)}
          />
        </div>
      ))}
    </>
  );
}
