import { Button, Input, Note, Tabs, Text, useToasts } from '@geist-ui/core';
import { useEffect, useRef, useState } from 'react';

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
  const [codeText, setCodeText] = useState('');

  const { handleUpload, handleSync } = useOnedrive();

  const handleSetCode = () => {
    if (codeRef.current?.value) {
      const code = codeRef.current.value.replace(/.*\?code=/g, '').trim();
      verifyData.authCode = code;

      setToast({ text: 'code 设置成功，请重新点击想操作的按钮', delay: 3000 });
      return;
    }
    setToast({ text: '请填写 code', delay: 3000 });
  };

  useEffect(() => {
    if (isBrowser) {
      const text = verifyData.authCode;
      setCodeText(text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- 服务端不存在 localStorage
  }, []);

  return (
    <div className="md:flex justify-between items-center mb-4">
      <Tabs leftSpace="" initialValue={dataSource} onChange={value => setDataSource(value as DataSource)}>
        <Tabs.Item label="OneDrive" value="onedrive">
          <div className="mb-4">
            <Input
              className="md:!w-[calc(15*16px)]"
              placeholder="输入 Code..."
              ref={codeRef}
              onChange={e => setCodeText(e.target.value)}
              value={codeText}
            />
            <Button type="secondary-light" className="!ml-3" onClick={handleSetCode} auto scale={2.5 / 3}>设置值</Button>
          </div>
          <div className="mb-4">
            <Button type="secondary-light" onClick={handleSync} className="!mr-3 lt-md:!mb-4" icon={<div className="i-carbon-cloud-download text-5" />} auto scale={0.77}>
              从 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'} 同步
            </Button>
            <Button type="secondary-light" onClick={() => handleUpload(servicesData)} icon={<div className="i-carbon-cloud-upload text-5" />} auto scale={0.77}>
              更新至 {dataSource === 'onedrive' ? 'OneDrive' : 'GoogleDrive'}
            </Button>
          </div>
          <Note type="warning">
            <Text>
              获取 Token 仅用于更新、同步 Home-Page 的数据。并且 Token 等数据都只会存在本地浏览器中
              <br />
              点击任意一个按钮，授权 OneDrive 权限。然后将跳转后的地址栏链接复制到输入框并点击「设置值」
            </Text>
          </Note>
        </Tabs.Item>
        <Tabs.Item disabled label="Google Drive" value="googledrive">
          尚未支持
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
