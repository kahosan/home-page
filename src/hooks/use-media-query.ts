import { type Dispatch, useEffect, useState } from 'react';

const queriesMap = new Map<string, { mql: MediaQueryList; dispatchers: Set<Dispatch<boolean>>; listener: () => void }>();

type QueryStateSetter = (matches: boolean) => void;

const querySubscribe = (query: string, setState: QueryStateSetter) => {
  let entry = queriesMap.get(query);

  if (!entry) {
    const mql = window.matchMedia(query);
    const dispatchers = new Set<QueryStateSetter>();
    const listener = () => {
      dispatchers.forEach(d => d(mql.matches));
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', listener, { passive: true });
    } else {
      mql.addListener(listener);
    }

    entry = {
      mql,
      dispatchers,
      listener
    };
    queriesMap.set(query, entry);
  }

  entry.dispatchers.add(setState);
  setState(entry.mql.matches);
};

const queryUnsubscribe = (query: string, setState: QueryStateSetter): void => {
  const entry = queriesMap.get(query);

  // else path is impossible to test in normal situation
  /* istanbul ignore else */
  if (entry) {
    const { mql, dispatchers, listener } = entry;
    dispatchers.delete(setState);

    if (!dispatchers.size) {
      queriesMap.delete(query);

      if (mql.removeEventListener) {
        mql.removeEventListener('change', listener);
      } else mql.removeListener(listener);
    }
  }
};

/**
 * Tracks the state of CSS media query.
 *
 * Return undefined initially and later receives correct value.
 *
 * @param query CSS media query to track.
 */
export const useMediaQuery = (query: string): boolean | undefined => {
  const [state, setState] = useState<boolean>();

  useEffect(() => {
    querySubscribe(query, setState);

    return () => queryUnsubscribe(query, setState);
  }, [query]);

  return state;
};
