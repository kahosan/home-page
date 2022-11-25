import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import serviceJSON from '../../services.json';

const servicesAtom = atomWithStorage('services', serviceJSON);

export const useServiceData = () => useAtom(servicesAtom);
