import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import serviceJSON from '../../services.json';

const servicesAtom = atomWithStorage('services', serviceJSON);
const servicesBackupAtom = atomWithStorage('services-backup', serviceJSON);

export const useServiceData = () => useAtom(servicesAtom);
export const useServiceDataBackup = () => useAtom(servicesBackupAtom);
