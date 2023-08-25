import { Loading } from '@geist-ui/core';

import Footer from '../footer';
import Hitokoto from '../hitokoto';
import ServiceCard from '../service-card';

import { useServices } from 'src/hooks/use-services';

import useSWR from 'swr';
import { fetcher } from 'src/lib/fetcher';

import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';

import type { Env } from 'src/types/env';

function DateTag() {

  const day = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  } as const;
  const date = new Date();

  const dateText = `${getYear(date)} 年 ${getMonth(date) + 1} 月 ${getDate(date)} 日 ${day[getDay(date)]}`;

  return (
    <p className="op-60 my-1 text-3">{dateText}</p>
  );
}

export default function DataCenter() {
  const { servicesData } = useServices();
  // docker 动态加载 env
  const { data } = useSWR<Env>('/api/env', fetcher);
  return (
    <div className="min-h-100vh pt-70px px-4 max-w-5xl mx-auto relative pb-70">
      <div className="flex justify-between items-center min-h-14">
        <div>
          <h3 className="mb-0 font-bold">{data?.title}</h3>
          <DateTag />
        </div>
        <div className="text-right text-0.9rem lt-md:w-50% mt-1">
          <Hitokoto />
        </div>
      </div>
      <section className="mt-5 p-4 w-full rd-2 dark:bg-dark-box-background bg-box-background">
        {
          (servicesData && servicesData.length !== 0)
            ? (
              <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
                {servicesData.map(service => <ServiceCard {...service} key={service.name} />)}
              </div>
            )
            : (
              <Loading />
            )
        }
      </section>
      <Footer />
    </div>
  );
}
