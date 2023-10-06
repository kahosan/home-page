import Footer from '../footer';
import Hitokoto from '../hitokoto';

import DateTag from './date-tag';
import DataView from './data-view';

import { useServices } from 'src/hooks/use-services';

import useSWR from 'swr';
import { fetcher } from 'src/lib/fetcher';

import type { Env } from 'src/types/env';
import DataGroup from './data-group';

export default function DataCenter() {
  const { servicesData, handleDeleteService, handleEditService } = useServices();
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
        <DataView servicesData={servicesData} handleDelete={handleDeleteService} handleEdit={handleEditService} />
      </section>
      <section className="mt-5">
        <DataGroup />
      </section>
      <Footer />
    </div>
  );
}
