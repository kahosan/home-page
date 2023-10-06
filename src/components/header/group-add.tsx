import { Checkbox, Input, Modal, Select, Spacer, useModal, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useGroups } from 'src/hooks/use-groups';
import { useServices } from 'src/hooks/use-services';

export default function GroupAdd({ isEdit }: { isEdit: boolean }) {
  const { setVisible, visible } = useModal(false);
  const { servicesData } = useServices();
  const { createGroup } = useGroups();

  const { setToast } = useToasts();

  const [selected, setSelected] = useState<string[] | string>([]);
  const [name, setName] = useState<string>();
  const [remove, setRemove] = useState<boolean>(false);

  const handleCreate = () => {
    if (!selected || !name) {
      setToast({
        text: '请选择卡片或填写名称',
        type: 'error'
      });
      return;
    }

    const services = servicesData?.filter(item => selected.includes(item.name));

    createGroup({ name, services: services ?? [] }, remove);

    setVisible(false);
    setSelected([]);
    setName('');
    setRemove(false);
  };

  const handleChange = (value: string | string[]) => setSelected(value);

  return (
    <>
      <div>
        <div onClick={() => setVisible(true)} className={`${isEdit ? 'visible op-101' : 'invisible op-0'} transition-all i-carbon-group-objects-new text-5 mr-3 cursor-pointer opacity-animation-3`} />
      </div>
      <Modal visible={visible} disableBackdropClick>
        <Modal.Title>创建分组</Modal.Title>
        <Modal.Content className="!mx-auto">
          <Input label="名称" onChange={e => setName(e.target.value)} />
          <Spacer />
          <Select multiple width="100%" placeholder="选择现有的卡片" onChange={e => handleChange(e)}>
            {
              servicesData
                ?.map(item => {
                  return <Select.Option value={item.name} key={item.name}>{item.name}</Select.Option>;
                })
            }
          </Select>
          <Spacer />
          <div className="flex gap-1.5 items-center">
            <p className="text-3.5">在首页中删除</p>
            <Checkbox onChange={e => setRemove(e.target.checked)} />
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
        <Modal.Action onClick={() => handleCreate()}>提交</Modal.Action>
      </Modal>
    </>
  );
}
