import ThemeToggle from '@/components/theme-toggle';
import Divider from '@/components/divider';

import { useEditServices } from '@/hooks/use-edit-services';
import { useIsGithubPages } from '@/hooks/use-is-github-pages';

export default function Header() {
  const { edit, setEdit } = useEditServices();
  const isGithubPages = useIsGithubPages();

  return (
    <header className="fixed top-0 right-0 left-0 z-999 blur-bg dark:bg-[rgba(12,12,12,0.65)] bg-[rgb(241,241,241,0.65)]">
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto h-60px">
        <h3>{import.meta.env.HOME_HEADER_TITLE || 'Data Center'}</h3>
        <div className="flex items-baseline">
          <div className={`${isGithubPages && edit ? 'visible op-100' : 'invisible op-0'} transition-all i-carbon-save text-5 mr-3 cursor-pointer`} />
          <div onClick={() => setEdit(!edit)} className={`mr-3 opacity-animation-3 ${edit ? 'i-carbon-edit-off' : 'i-carbon-edit'} text-5 cursor-pointer icon-tap-color`} />
          <ThemeToggle />
        </div>
      </div>
      <Divider className="absolute top-60px op-5" />
    </header>
  );
}
