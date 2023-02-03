import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import { GeistProvider } from '@geist-ui/core';

import type { AppProps } from 'next/app';

import { useMediaQuery } from 'src/hooks/use-media-query';
import { isBrowser } from 'src/lib/utils';

import '../styles/app.css';
import '../styles/uno.css';

export type Theme = 'light' | 'dark';

const baseThemeAtom = atom<Theme>('light');
export const themeAtom = atom(
  get => get(baseThemeAtom),
  (_get, set, value: Theme) => {
    set(baseThemeAtom, value);
    if (isBrowser) {
      Promise.resolve().then(() => {
        localStorage.setItem('theme', value);
      });
    }
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useAtom(themeAtom);
  const isSystemThemeDark = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (isBrowser && isSystemThemeDark) {
      const storedTheme = localStorage.getItem('theme') as 'dark' | 'light';
      const systemTheme = isSystemThemeDark ? 'dark' : 'light';

      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme(systemTheme);
      }
    }
  }, [isSystemThemeDark, setTheme, theme]);

  return (
    <GeistProvider themeType={theme}>
      <Component {...pageProps} />
    </GeistProvider>
  );
}
