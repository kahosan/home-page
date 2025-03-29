// eslint-disable-next-line @typescript-eslint/no-restricted-imports -- ignore
import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from 'src/lib/utils';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
