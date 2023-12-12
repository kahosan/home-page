import { Checkbox, Collapse } from '@geist-ui/core';

import SyncData from './sync-data';

import { useAtom } from 'jotai';
import { serviceNameUpperAtom, serviceOpenWithNewTabAtom } from '../service-card';

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
      <div className="border-b-style-solid dark:border-[#3f3f3f] border-[#bfbfbf]" />
    </>
  );
}

export default function SettingsOption({ title }: { title: SettingItems }) {
  const [isUpper, setIsUpper] = useAtom(serviceNameUpperAtom);
  const [newTab, setNewTab] = useAtom(serviceOpenWithNewTabAtom);
  switch (title) {
    case '基本设置':
      return (
        <OptionWrapper title={title} initialVisible>
          <div className="flex flex-wrap gap-4">
            <Checkbox checked={isUpper} onChange={() => setIsUpper(p => !p)}>服务名大写</Checkbox>
            <Checkbox checked={newTab} onChange={() => setNewTab(p => !p)}>在新标签页打开服务</Checkbox>
          </div>
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
