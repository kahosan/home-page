import Header from '../components/header';
import DataCenter from '../components/data-center';
import type { Service } from 'src/types/services';

export default function HomePage({ services }: { services: Service[] }) {
  return (
    <>
      <Header />
      <DataCenter servicesData={services} />
    </>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.API_URL}/api/services`);
  const data = await resp.json();

  return {
    props: { services: data }
  };
}
