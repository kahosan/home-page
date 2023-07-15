import { Checkbox, Collapse } from '@geist-ui/core';

import SyncData from './sync-data';

import { useAtom } from 'jotai';
import { serviceNameUpperAtom } from '../service-card';

import type { SettingItems } from 'src/pages/settings';

interface OptionWrapperProps {
  title: string
  initialVisible?: boolean
  children: React.ReactNode
}

function OptionWrapper({ title, initialVisible, children }: OptionWrapperProps) {
  return (
    <>
      <Collapse
        initialVisible={initialVisible}
        title={title}
        className="border-none!"
      >
        {children}
      </Collapse>
      <div className="border-b-style-solid border-[#3f3f3f]" />
    </>
  );
}

export default function SettingsOption({ title }: { title: SettingItems }) {
  const [isUpper, setIsUpper] = useAtom(serviceNameUpperAtom);
  switch (title) {
    case '基本设置':
      return (
        <OptionWrapper title={title} initialVisible>
          <Checkbox checked={isUpper} onChange={() => setIsUpper(p => !p)}>服务名大写</Checkbox>
        </OptionWrapper>
      );
    case '同步数据':
      return (
        <OptionWrapper title={title}>
          <SyncData />
        </OptionWrapper>
      );
    default:
      return null;
  }
}
