import ServiceCard from '../service-card';

import type { Service } from 'src/types/services';

export default function Services({ servicesData }: { servicesData: Service[] }) {
  return (
    <>
      {servicesData.map(service => <ServiceCard {...service} key={service.name} />)}
    </>
  );
}
