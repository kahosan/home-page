import { ThemeToggle } from '../theme-toggle';
import Divider from '@/components/divider';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-999  blurBackground">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto">
        <h3>Data Center</h3>
        <div className="flex flex-row children:mx-2">
          <a className="icon i-carbon-logo-github text-5" href="https://github.com/kahosan/home-page" target="_blank" rel="noreferrer">github</a>
          <ThemeToggle />
        </div>
      </div>
      <Divider className="absolute top-12.5 op-10" />
    </header>
  );
}
