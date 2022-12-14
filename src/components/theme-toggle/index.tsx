import { useCallback } from 'preact/hooks';
import { useDark } from '../../hooks/use-dark';

export default function ThemeToggle() {
  const { currentTheme, setTheme } = useDark();

  const toggle = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme, setTheme]);

  return (
    <div onClick={toggle} className={`${currentTheme === 'dark' ? 'i-carbon-sun' : 'i-carbon-moon'} text-5 cursor-pointer opacity-animation-3 icon-tap-color`} />
  );
}
