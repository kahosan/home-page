import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Toaster } from 'react-hot-toast';

import GithubModal from './components/github-modal';
import Header from './components/header';

import { useDark } from './hooks/use-dark';
import { useIsGithubPages } from './hooks/use-is-github-pages';

import DataCenterPage from './pages';

const isFirstRenderAtom = atomWithStorage('is-first-render', true);

export function App() {
  const { currentTheme } = useDark();
  const [isFirstRender, setIsFirstRender] = useAtom(isFirstRenderAtom);
  const isGithubPages = useIsGithubPages();

  return (
    <>
      <Header />
      <DataCenterPage />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: currentTheme === 'dark' ? '#0c0c0c' : '#f1f1f1',
            color: currentTheme === 'dark' ? '#e2e2e2' : '#1d1d1d',
            fontSize: '0.875rem'
          }
        }}
      />
      <GithubModal open={isFirstRender && isGithubPages} onClose={() => setIsFirstRender(false)} />
    </>
  );
}
