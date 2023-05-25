import { getYear } from 'date-fns';
import { fetcher } from 'src/lib/fetcher';
import useSWR from 'swr';

import Link from '../link';
import SystemInfo from './system-info';

import type { Env } from 'src/types/env';

export default function Footer() {
  const { data } = useSWR<Env>('/api/env', fetcher);
  return (
    <footer className=" max-w-5xl mx-auto p-3 op-60 mt-8 absolute bottom-2 right-0 left-0">
      <div className="font-300 text-13px flex justify-between items-end w-full">
        <div className="m-0">
          <div className="ml-4px">
            <SystemInfo />
          </div>
          <p className="mt-2">
            <Link href={data?.blog}>Blog</Link>
            <Link href={data?.twitter}>Twitter</Link>
          </p>
        </div>
        <div className="text-right dark:op-60">
          <div className="custom-bg" />
          <p className="mr-4px mb-1">由<Link href="https://github.com/kahosan/home-page">Home-Page</Link>强力驱动</p>
          <span className="op-100">©&nbsp;{getYear(new Date())} </span>
          PowerBy&nbsp;
          <Link href="https://https://nextjs.org/">Next.js</Link> & <Link href="https://reactjs.org/">React</Link>
        </div>
      </div>
    </footer>
  );
}
