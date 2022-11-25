import { Base64 } from 'js-base64';
import ServiceCard from '../service-card';

import { useServiceData } from '@/hooks/use-service-data';

export default function Services() {
  const [services] = useServiceData();

  return (
    <>
      {services.map(service => <ServiceCard {...service} key={service.name} />)}
    </>
  );
}
