import { Button, Input, Note, Select, Text, useToasts } from '@geist-ui/core';
import { useEffect, useRef } from 'react';

import { atom, useAtom } from 'jotai';

import { useOnedrive } from 'src/hooks/use-onedrive';
import { useServices } from 'src/hooks/use-services';
import { useOnedriveLS } from 'src/hooks/use-onedrive-ls';
import { isBrowser } from 'src/lib/utils';

export type DataSource = 'onedrive' | 'googledrive';
export const dataSourceAtom = atom<DataSource>('onedrive');

export default function SyncData() {
  const { setToast } = useToasts();
  const { servicesData } = useServices();
  const verifyData = useOnedriveLS();

  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  const codeRef = useRef<HTMLInputElement>(null);

  const { handleUpload, handleSync } = useOnedrive();

  const handleSetCode = () => {
    if (codeRef.current?.value) {
      const code = codeRef.current.value.replace(/.*\?code=/g, '');
      verifyData.authCode = code;

      setToast({ text: 'code 设置成功' });
      return;
    }
    setToast({ text: '请填写 code', delay: 3000 });
  };

  useEffect(() => {
    if (codeRef.current && isBrowser) {
      codeRef.current.value = localStorage.getItem('onedrive-auth-code') ?? '';
    }
  }, []);

  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <Select placeholder="同步方式" initialValue={dataSource} onChange={value => setDataSource(value as DataSource)}>
          <Select.Option value="onedrive">OneDrive</Select.Option>
          <Select.Option value="googledrive" disabled>Google Drive</Select.Option>
        </Select>
        <div className="lt-md:mt-4">
          <Button onClick={handleSync} className="!mr-3 lt-md:!mb-4" icon={<div className="i-carbon-cloud-download text-5" />} auto scale={0.77}>
            从 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'} 同步
          </Button>
          <Button onClick={() => handleUpload(servicesData)} icon={<div className="i-carbon-cloud-upload text-5" />} auto scale={0.77}>
            更新至 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'}
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input className="md:!w-[calc(15*16px)]" placeholder="输入 Code..." ref={codeRef} />
        <Button className="!ml-3" onClick={handleSetCode} auto scale={2.5 / 3}>设置值</Button>
      </div>
      <Note type="warning">
        <Text>
          获取 Token 仅用于更新、同步 Home-Page 的数据。并且 Token 等数据都只会存在本地浏览器中。
          <br />
          将跳转后的网页的地址栏链接复制粘贴到输入框中并点击「设置值」按钮。
        </Text>
      </Note>
    </>
  );
}
