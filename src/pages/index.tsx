import Head from 'next/head';

import { SWRConfig } from 'swr';

import Header from '../components/header';
import DataCenter from '../components/data-center';

import { BLOG, HEADER_TITLE, TITLE, TWITTER } from 'src/lib/constant';
import type { Service } from 'src/types/services';
import type { Env } from 'src/types/env';

export default function HomePage({ fallback }: Record<string, any>) {
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

export async function getServerSideProps() {
  let servicesData: Service[] = [];
  const envData: Env = {
    title: TITLE,
    headerTitle: HEADER_TITLE,
    blog: BLOG,
    twitter: TWITTER
  };

  if (process.env.API_URL !== '' && process.env.API_URL !== undefined) {
    const res = await fetch(`${process.env.API_URL}/api/services`);
    servicesData = await res.json();
  }

  return {
    props: {
      fallback: {
        '/api/services': servicesData,
        '/api/env': envData
      }
    }
  };
}
