import { Button, Input, Note, Select, Text, useToasts } from '@geist-ui/core';

import { atom, useAtom } from 'jotai';
import { useRef } from 'react';
import { useOnedrive } from 'src/hooks/use-onedrive';

export type DataSource = 'onedrive' | 'googledrive';
export const dataSourceAtom = atom<DataSource>('onedrive');

export default function SyncData() {
  const { setToast } = useToasts();
  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  const codeRef = useRef<HTMLInputElement>(null);

  const { handleUpload } = useOnedrive();

  const handleSetCode = () => {
    if (codeRef.current?.value) {
      localStorage.setItem('onedrive-code', codeRef.current?.value || '');
      return;
    }

    setToast({
      text: '请填写 code',
      delay: 3000
    });
  };

  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <Select placeholder="同步方式" initialValue={dataSource} onChange={value => setDataSource(value as DataSource)}>
          <Select.Option value="onedrive">OneDrive</Select.Option>
          <Select.Option value="googledrive" disabled>Google Drive</Select.Option>
        </Select>
        <div className="lt-md:mt-4">
          <Button className="md:!mr-3 lt-md:!mb-4" icon={<div className="i-carbon-cloud-download text-5" />} auto scale={0.77}>
            从 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'} 同步
          </Button>
          <Button onClick={handleUpload} icon={<div className="i-carbon-cloud-upload text-5" />} auto scale={0.77}>
            更新至 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'}
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input className="md:!w-[calc(15*16px)]" placeholder="填写 code..." ref={codeRef} />
        <Button className="!ml-3" onClick={handleSetCode} auto scale={2.5 / 3}>设置值</Button>
      </div>
      <Note type="warning">
        <Text>
          获取 Token 仅用于更新、同步 home-page 的数据。并且 Token 等数据都只会存在本地浏览器中。
        </Text>
      </Note>
    </>
  );
}
