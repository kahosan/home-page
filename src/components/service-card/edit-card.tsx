import { Input, Modal, Spacer, useModal } from '@geist-ui/core';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Link from '../link';

import { useEdit } from 'src/hooks/use-edit';

import type { Service } from 'src/types/services';

interface Props extends Service {
  handleEdit: (service: Service, id: string) => void
}

export default function EditCard(props: Props) {
  const { isEdit } = useEdit();
  const { visible, setVisible } = useModal(false);

  const [service, setService] = useState<Service>(props);

  const id = props.name;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Service) => {
    setService(s => ({ ...s, [key]: e.target.value }));
  };

  return (
    <>
      <div onClick={() => setVisible(true)} className={`absolute top-7 right--2 i-carbon-edit transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
      <Modal visible={visible} disableBackdropClick>
        <Modal.Title>编辑卡片</Modal.Title>
        <Modal.Subtitle>所有选项都必填</Modal.Subtitle>
        <Modal.Content className="!mx-auto">
          <Input label="名称" value={service.name} onChange={e => handleChange(e, 'name')} />
          <Spacer />
          <Input label="描述" value={service.description} onChange={e => handleChange(e, 'description')} />
          <Spacer />
          <Input label="路径" value={service.path} onChange={e => handleChange(e, 'path')} />
          <Spacer />
          <Input label="图标" value={service.icon} onChange={e => handleChange(e, 'icon')} />
          <div className="text-center text-sm mt-2">
            Tip:
            <Link href="https://icones.js.org/collection/carbon" target="_blank">跳转到选择图标的页面</Link>
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
        <Modal.Action onClick={() => {
          props.handleEdit(service, id);
          setVisible(false);
        }}>提交</Modal.Action>
      </Modal>
    </>
  );
}
