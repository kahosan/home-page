import { useCallback } from 'react';

import { useAtom } from 'jotai';
import { themeAtom } from 'src/pages/_app';

export default function ThemeToggle() {
  const [themeType, setTheme] = useAtom(themeAtom);

  const toggle = useCallback(() => {
    setTheme(themeType === 'IDark' ? 'ILight' : 'IDark');
  }, [themeType, setTheme]);

  return (
    <div onClick={toggle} className={`${themeType === 'IDark' ? 'i-carbon-sun' : 'i-carbon-moon'} text-5 cursor-pointer opacity-animation-3 icon-tap-color`} />
  );
}
