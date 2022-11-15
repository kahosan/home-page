import { ThemeToggle } from '../theme-toggle';
import Divider from '@/components/divider';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg dark:bg-[rgba(12,12,12,0.65)] bg-[rgb(241,241,241,0.65)]">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h3>Data Center</h3>
        <div className="flex flex-row children:mx-2">
          <a className="opacity-animation-3 i-carbon-logo-github text-5" href={import.meta.env.HOME_GITHUB || 'https://github.com'} target="_blank" rel="noreferrer">github</a>
          <ThemeToggle />
        </div>
      </div>
      <Divider className="absolute top-60px op-5" />
    </header>
  );
}
