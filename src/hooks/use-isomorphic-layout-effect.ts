import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from 'src/lib/utils';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
