import { CssBaseline, GeistProvider, Themes } from '@geist-ui/core';

import { useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import type { AppProps } from 'next/app';

import { isBrowser } from 'src/lib/utils';
import { useMediaQuery } from 'src/hooks/use-media-query';

import '../styles/app.css';
import '../styles/uno.css';

const IThemeLight = Themes.createFromLight({
  type: 'ILight',
  palette: {
    background: '#f1f1f1',
    foreground: '#1d1d1d'
  }
});

const IThemeDark = Themes.createFromDark({
  type: 'IDark',
  palette: {
    background: '#0c0c0c',
    foreground: '#e2e2e2'
  }
});

export type Theme = 'ILight' | 'IDark' | 'system';

const baseThemeAtom = atom<Theme>('system');
export const themeAtom = atom(
  get => get(baseThemeAtom),
  (_get, set, value: Theme) => {
    set(baseThemeAtom, value);
    if (isBrowser) {
      Promise.resolve().then(() => {
        if (value === 'system') {
          localStorage.removeItem('theme');
        } else {
          localStorage.setItem('theme', value);
        }
      });
    }
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const isSystemThemeDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (isBrowser) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'IDark' || storedTheme === 'ILight') {
        setTheme(storedTheme);
      } else {
        // null or invalid value
        setTheme('system');
        if (storedTheme) {
          Promise.resolve().then(() => localStorage.removeItem('theme'));
        }
      }
    }
  }, [setTheme]);

  const geistThemeType = useMemo(() => {
    if (theme === 'system') {
      return isSystemThemeDark ? 'IDark' : 'ILight';
    }

    return theme;
  }, [isSystemThemeDark, theme]);

  return (
    <GeistProvider themes={[IThemeLight, IThemeDark]} themeType={geistThemeType}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
