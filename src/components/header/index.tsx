import { useState } from 'preact/hooks';

import GithubModal from '../github-modal';
import ThemeToggle from '../theme-toggle';
import Divider from '../divider';
import Link from '../link';
import Modal from '../modal';
import InputGroup from '../input-group';

import { useEditServices } from '@/hooks/use-edit-services';
import { useIsGithubPages } from '@/hooks/use-is-github-pages';

import type { ServiceData } from '@/types/service-card';

export default function Header() {
  const {
    editMode,
    toggleEditMode,
    handleRestoreService,
    handleSaveService,
    handleAddService
  } = useEditServices();

  const [openGithubModal, setOpenGithubModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newApp, setNewApp] = useState<ServiceData>({
    name: '',
    path: '',
    description: '',
    icon: ''
  });

  const isGithubPages = useIsGithubPages();

  const handleAdd = () => {
    handleAddService(newApp);
    setOpenAddModal(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg dark:bg-[rgba(12,12,12,0.65)] bg-[rgb(241,241,241,0.65)]">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h3>{import.meta.env.HOME_HEADER_TITLE || 'Data Center'}</h3>
        <div className="flex items-baseline">
          <div onClick={() => handleRestoreService()} className={`${isGithubPages && editMode ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-reset text-5 mr-3 cursor-pointer opacity-animation-3`} />
          <div onClick={() => handleSaveService()} className={`${isGithubPages && editMode ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-save text-5 mr-3 cursor-pointer opacity-animation-3`} />
          <div onClick={() => setOpenAddModal(true)} className={`${isGithubPages && editMode ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-task-add text-5 mr-3 cursor-pointer opacity-animation-3`} />
          <div onClick={() => setOpenGithubModal(true)} className={`${isGithubPages ? 'visible op-100' : 'invisible op-0'} mr-3 transition-all i-carbon-logo-github text-5 mr-3 cursor-pointer opacity-animation-3`} />
          <div onClick={() => toggleEditMode()} className={`mr-3 opacity-animation-3 ${editMode ? 'i-carbon-edit-off' : 'i-carbon-edit'} text-5 cursor-pointer icon-tap-color`} />
          <ThemeToggle />
        </div>
      </div>
      <Divider className="absolute top-60px op-5" />
      <GithubModal open={openGithubModal} onClose={() => setOpenGithubModal(false)} />
      <Modal title="新增应用" open={openAddModal}>
        <form>
          <div className="px-10 children:mb-5">
            <InputGroup text="名称" onChange={e => setNewApp(newApp => ({ ...newApp, name: e.currentTarget.value }))} />
            <InputGroup text="路径" onChange={e => setNewApp(newApp => ({ ...newApp, path: e.currentTarget.value }))} />
            <InputGroup text="描述" onChange={e => setNewApp(newApp => ({ ...newApp, description: e.currentTarget.value }))} />
            <InputGroup text="图标" onChange={e => setNewApp(newApp => ({ ...newApp, icon: e.currentTarget.value }))} />
            <Link href="https://icones.js.org/collection/carbon">跳转到选择图标的页面</Link>
          </div>
          <div className="w-100% border op-20 mt-8" />
          <div className="flex">
            <Modal.Action type="button" onClick={() => setOpenAddModal(false)}>
              不填
            </Modal.Action>
            <Modal.Action type="button" onClick={() => handleAdd()}>
              提交
            </Modal.Action>
          </div>
        </form>
      </Modal>
    </header>
  );
}
