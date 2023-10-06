import { Loading } from '@geist-ui/core';

import ServiceCard from '../service-card';

import type { Service } from 'src/types/services';

interface Props {
  servicesData: Service[] | undefined
  handleDelete: (name: string | string[]) => void
  handleEdit: (service: Service, id: string) => void
}

export default function DataView({ servicesData, handleDelete, handleEdit }: Props) {
  if (!servicesData || servicesData.length === 0) return <Loading />;

  return (
    <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
      {servicesData.map(service => <ServiceCard {...service} handleDelete={handleDelete} handleEdit={handleEdit} key={service.name} />)}
    </div>
  );
}
