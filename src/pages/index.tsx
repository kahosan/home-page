import Head from 'next/head';

import { SWRConfig } from 'swr';

import Header from '../components/header';
import DataCenter from '../components/data-center';

import type { Service } from 'src/types/services';

export default function HomePage({ fallback }: { fallback: Service[] }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>BQ Center</title>
      </Head>
      <Header />
      <DataCenter />
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/services`);
  const servicesData = await res.json();

  return {
    props: {
      fallback: {
        '/api/services': servicesData
      }
    }
  };
}
