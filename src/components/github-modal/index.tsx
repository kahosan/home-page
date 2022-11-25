import { useState } from 'preact/hooks';

import Modal from '../modal/index';
import InputGroup from '../input-group';

import { useGithubUserInfo } from '@/hooks/use-github-api';

interface Props {
  open: boolean
  onClose: () => void
}

export default function GithubModal({ open, onClose }: Props) {
  const [, setGithubUserInfo] = useGithubUserInfo();

  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    onClose();

    setGithubUserInfo({
      owner,
      repo: 'home-page',
      path: 'services.json',
      email,
      token
    });
  };

  return (
    <Modal title="请填写 Github 信息" subTitle="您的信息只会存储在浏览器中" open={open}>
      <form>
        <div className="px-10 children:mb-5">
          <InputGroup text="邮箱" onChange={e => setEmail(e.currentTarget.value)} />
          <InputGroup text="用户名" onChange={e => setOwner(e.currentTarget.value)} />
          <InputGroup text="Token" onChange={e => setToken(e.currentTarget.value)} />
        </div>
        <div className="w-100% border op-20 mt-8" />
        <div className="flex">
          <Modal.Action
            type="button"
            onClick={() => {
              setGithubUserInfo(null);
              onClose();
            }}
          >
            不填
          </Modal.Action>
          <Modal.Action type="button" onClick={handleSubmit}>
            提交
          </Modal.Action>
        </div>
      </form>
    </Modal>
  );
}
