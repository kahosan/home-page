import { Button, Input, Note, Tabs, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';

import { useOnedrive } from 'src/hooks/use-onedrive';
import { useOnedriveData } from 'src/hooks/use-onedrive-data';
import { useServices } from 'src/hooks/use-services';
import { getAuthCode } from 'src/utils/onedrive-auth';

export type DataSource = 'onedrive' | 'googledrive';
export default function SyncData() {
  const { setToast } = useToasts();
  const { servicesData } = useServices();
  const [onedriveData, setOnedriveData] = useOnedriveData();

  const [codeText, setCodeText] = useState('');

  const { handleUpload, handleSync } = useOnedrive();

  const handleSetCode = () => {
    if (!codeText) {
      setToast({ text: '请输入 Code', type: 'error', delay: 3000 });
      return;
    }
    const code = codeText.replace(/.*\?code=/g, '').trim();
    setOnedriveData({ ...onedriveData, authCode: code });
    setToast({ text: 'code 设置成功，请点击想操作的按钮', delay: 3000 });
  };

  return (
    <div className="md:flex md:items-center">
      <Tabs leftSpace="" initialValue="onedrive" className="flex-1">
        <Tabs.Item label="OneDrive" value="onedrive">
          <div className="mb-4">
            <Input
              w="100%"
              placeholder="输入 Code..."
              onChange={e => setCodeText(e.target.value)}
              onKeyUp={e => e.key === 'Enter' && handleSetCode()}
              defaultValue={onedriveData.authCode}
            />
          </div>
          <div className="mb-4 grid md:justify-center gap-2 md:grid-cols-[repeat(auto-fit,24%)]">
            <Button
              type="secondary-light"
              onClick={handleSetCode}
              icon={<div className="i-carbon-brush-freehand text-5" />}
              auto
              scale={0.7}
            >
              设置 Code
            </Button>
            <Button
              type="secondary-light"
              onClick={getAuthCode}
              icon={<div className="i-carbon-folder-open text-5" />}
              auto
              scale={0.7}
            >
              获取 Code
            </Button>
            <Button
              type="secondary-light"
              onClick={handleSync}
              icon={<div className="i-carbon-cloud-download text-5" />}
              auto
              scale={0.7}
            >
              从 OneDrive 同步
            </Button>
            <Button
              type="secondary-light"
              onClick={() => handleUpload(servicesData)}
              icon={<div className="i-carbon-cloud-upload text-5" />}
              auto
              scale={0.7}
            >
              更新至 OneDrive
            </Button>
          </div>
          <Note type="warning">
            <Text>
              获取 Token 仅用于更新、同步 Home-Page 的数据。并且 Token 等数据都只会存在本地浏览器中
              <br />
              点击「获取 Code」按钮，授权 OneDrive 权限。然后将跳转后的地址栏链接复制到输入框并点击「设置 Code」
            </Text>
          </Note>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
