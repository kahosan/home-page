import { Collapse } from '@geist-ui/core';
import type { ReactNode } from 'react';

import SyncData from './sync-data';

import type { SettingItems } from 'src/pages/settings';

function OptionWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Collapse
      title=" "
      subtitle={<h3 className="absolute top-19.5 dark:color-#e2e2e2 color-#1d1d1d">{title}</h3>}
      className="!border-none"
    >
      {children}
    </Collapse>
  );
}

export default function SettingsOption({ title }: { title: SettingItems }) {
  switch (title) {
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
