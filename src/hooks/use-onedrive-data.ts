import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface AccessTokenWrapper {
  expires: number
  token: string
}

interface OnedriveData {
  authCode: string
  refreshToken: string
  accessToken: AccessTokenWrapper
}

const onedriveAtom = atomWithStorage<OnedriveData>('onedrive-data', {
  authCode: '',
  refreshToken: '',
  accessToken: {
    expires: 0,
    token: ''
  }
});

export const useOnedriveData = () => useAtom(onedriveAtom);

export function calcAccessTokenExpires(expires: number) {
  return new Date().getTime() + expires * 1000;
}
