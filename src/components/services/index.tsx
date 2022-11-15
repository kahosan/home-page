import serviceJSON from '../../../services.json';
import ServiceCard from '../service-card';

export default function Services() {
  return (
    <>
      {serviceJSON.map(service => <ServiceCard {...service} key={service.name} />)}
    </>
  );
}
