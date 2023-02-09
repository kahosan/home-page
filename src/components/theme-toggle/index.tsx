import { useCallback } from 'react';

import { useAtom } from 'jotai';
import { themeAtom } from 'src/pages/_app';

export default function ThemeToggle() {
  const [themeType, setTheme] = useAtom(themeAtom);

  const toggle = useCallback(() => {
    const theme = themeType === 'dark' ? 'light' : 'dark';

    if (theme === 'dark') {
      setTheme(theme);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme(theme);
    }
  }, [themeType, setTheme]);

  return (
    <div onClick={toggle} className="dark:i-carbon-sun i-carbon-moon text-5 cursor-pointer opacity-animation-3 icon-tap-color" />
  );
}
