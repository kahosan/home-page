import { Toaster } from 'react-hot-toast';

import Header from './components/header';

import { useDark } from './hooks/use-dark';

import DataCenterPage from './pages';

export function App() {
  const { currentTheme } = useDark();

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
    </>
  );
}
