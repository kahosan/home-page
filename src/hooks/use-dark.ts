import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'preact/hooks';

import { isBrowser } from '../lib/utils';

type Theme = 'light' | 'dark' | 'system';

const systemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
const baseThemeAtom = atomWithStorage<Theme>('theme', localStorage.getItem('theme') as Theme || 'system');

const atomTheme = atom(
  get => get(baseThemeAtom),
  (_get, set, value: Theme) => {
    set(baseThemeAtom, value);
    if (isBrowser) {
      if (value === 'system') {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', value);
      }
    }
  }
);

export const useDark = () => {
  const [theme, setTheme] = useAtom(atomTheme);
  const currentTheme = theme === 'system' ? (systemTheme() ? 'dark' : 'light') : theme;

  useEffect(() => {
    const htmlElClassList = document.documentElement.classList;

    if (!htmlElClassList.value.includes(currentTheme)) {
      htmlElClassList.remove('dark', 'light');
      htmlElClassList.add(currentTheme);
    }
  }, [currentTheme]);

  return {
    theme,
    setTheme,
    currentTheme
  };
};
