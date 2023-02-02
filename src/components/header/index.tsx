import { useState } from 'react';

import { Divider } from '@geist-ui/core';

import { useAtom } from 'jotai';

import ThemeToggle from '../theme-toggle';

import Options from './options';

import { themeAtom } from 'src/pages/_app';

export default function Header() {
  const [themeType] = useAtom(themeAtom);

  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h4 className="mb-0 font-bold">{process.env.NEXT_PUBLICE_HOME_HEADER_TITLE || 'Data Center'}</h4>
        <div className="flex items-baseline">
          <Options />
          <ThemeToggle />
        </div>
      </div>
      <Divider className={`!m-0 ${themeType === 'IDark' ? 'op-60' : ''}`} />
    </header>
  );
}
