import { Divider } from '@geist-ui/core';

import ThemeToggle from '../theme-toggle';

import Options from './options';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h4 className="mb-0 font-bold">{process.env.NEXT_PUBLICE_HOME_HEADER_TITLE || 'Data Center'}</h4>
        <div className="flex items-baseline">
          <Options />
          <ThemeToggle />
        </div>
      </div>
      <div className="w-100% border-b border-current absolute top-60px op-5" />
      <Divider className="!m-0 dark:op-80 !dark:bg-#1D1D1D" />
    </header>
  );
}
