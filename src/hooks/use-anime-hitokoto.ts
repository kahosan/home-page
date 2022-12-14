import useSWR from 'swr';

import type { Hitokoto, RequestError } from '@/types/anime-hitokoto';

const fetcher = (url: string) => fetch(url).then(res => res.json());

/*
* 数据来源于 Hitokoto，感谢免费分享
* {@link https://hitokoto.cn/}
*/

export const useAnimeHitokoto = () => useSWR<Hitokoto, RequestError>(
  'https://v1.hitokoto.cn/?c=a',
  fetcher,
  {
    revalidateOnFocus: false,
    onError: (e) => {
      console.error(e.message);
    }
  }
);
