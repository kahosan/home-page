import { Divider } from '@geist-ui/core';

import Head from 'next/head';
import NextLink from 'next/link';
import SettingsOption from 'src/components/settings-option';

import ThemeToggle from 'src/components/theme-toggle';

export type SettingItems = '同步数据';

export default function Settings() {
  return (
    <>
      <div className="max-w-[64rem] mx-auto px-10 mt-xl blur-bg">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <title>BQ Settings</title>
        </Head>
        <div className="flex justify-between items-center mb-3 w-auto">
          <h3 className="">设置</h3>
          <div className="flex">
            <ThemeToggle />
            <NextLink href="/">
              <div className="i-carbon-home text-5 cursor-pointer opacity-animation-3 icon-tap-color" />
            </NextLink>
          </div>
        </div>
        <div />
      </div>
      <Divider className="!m-0 dark:op-80 !dark:bg-#1D1D1D" />
      <div className="max-w-[64rem] mx-auto px-10">
        <SettingsOption title="同步数据" />
      </div>
    </>
  );
}
