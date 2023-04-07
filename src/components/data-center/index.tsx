import { Loading } from '@geist-ui/core';

import { useState } from 'react';

import Footer from '../footer';
import Hitokoto from '../hitokoto';
import ServiceCard from '../service-card';

import { useIsomorphicLayoutEffect } from 'src/hooks/use-isomorphic-layout-effect';
import { useServices } from 'src/hooks/use-services';

import { getYear, getMonth, getDate, getDay } from 'date-fns';
import { isBrowser } from 'src/lib/utils';

function DateTag() {
  const [dateText, setDateText] = useState('loading...');

  // 提前渲染防止渲染时 text 的闪现
  useIsomorphicLayoutEffect(() => {
    // 客户端与服务端时间不一致会导致水合失败报错 仅在 SSG 模式下 这里是为了以客户端时间为准
    // https://github.com/vercel/next.js/discussions/39425
    if (isBrowser) {
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

      setDateText(`${getYear(date)} 年 ${getMonth(date) + 1} 月 ${getDate(date)} 日 ${day[getDay(date)]}`);
    }
  }, [setDateText]);

  return (
    <p className="op-60 my-1 text-3">{dateText}</p>
  );
}

export default function DataCenter() {
  const { servicesData } = useServices();

  return (
    <div className="min-h-100vh pt-70px px-4 max-w-5xl mx-auto relative pb-70">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="mb-0 font-bold">{process.env.NEXT_PUBLIC_HOME_TITLE || 'NAS 数据中心'}</h3>
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
