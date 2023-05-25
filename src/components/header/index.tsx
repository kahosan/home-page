import { Divider } from '@geist-ui/core';

import NextLink from 'next/link';

import useSWR from 'swr';
import { fetcher } from 'src/lib/fetcher';

import ThemeToggle from '../theme-toggle';
import Options from './options';

import type { Env } from 'src/types/env';

export default function Header() {
  // docker 动态加载 env
  const { data } = useSWR<Env>('/api/env', fetcher);
  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h4 className="mb-0 font-bold">{data?.headerTitle}</h4>
        <div className="flex items-baseline">
          <Options />
          <ThemeToggle />
          <NextLink href="/settings">
            <div className="i-carbon-settings text-5 cursor-pointer icon-tap-color opacity-animation-3 " />
          </NextLink>
        </div>
      </div>
      <div className="w-100% border-b border-current absolute top-60px op-5" />
      <Divider className="!m-0 dark:op-80 !dark:bg-#1D1D1D" />
    </header>
  );
}
