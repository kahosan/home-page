import Head from 'next/head';
import Header from '../components/header';
import DataCenter from '../components/data-center';

export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>BQ Center</title>
      </Head>
      <Header />
      <DataCenter />
    </>
  );
}
