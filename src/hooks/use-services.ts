import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'src/lib/fetcher';

import type { Service } from 'src/types/services';

export const useServices = () => {
  const { data, mutate } = useSWR<Service[]>('/api/services', fetcher, {
    onError(e) {
      console.error(e);
    }
  });

  return {
    servicesData: useMemo(() => data, [data]),
    update: () => mutate()
  };
};
