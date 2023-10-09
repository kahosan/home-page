import { Loading } from '@geist-ui/core';

import ServiceCard from '../service-card';

import type { Service } from 'src/types/services';

export default function DataView({ servicesData }: { servicesData: Service[] | undefined }) {
  if (!servicesData || servicesData.length === 0)
    return <Loading />;

  return (
    <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
      {servicesData.map(service => <ServiceCard {...service} key={service.name} />)}
    </div>
  );
}
