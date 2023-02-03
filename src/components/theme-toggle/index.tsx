import { useCallback } from 'react';

import { useAtom } from 'jotai';
import { themeAtom } from 'src/pages/_app';

export default function ThemeToggle() {
  const [themeType, setTheme] = useAtom(themeAtom);

  const toggle = useCallback(() => {
    const theme = themeType === 'dark' ? 'light' : 'dark';
    setTheme(theme);

    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [themeType, setTheme]);

  return (
    <div onClick={toggle} className="dark:i-carbon-sun i-carbon-moon text-5 cursor-pointer opacity-animation-3 icon-tap-color" />
  );
}
