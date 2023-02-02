import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Hitokoto {
  hitokoto: string
  from: string
}

/*
* 数据来源于 Hitokoto，感谢免费分享
* {@link https://hitokoto.cn/}
*/

export const useHitokoto = () => useSWR<Hitokoto>(
  'https://v1.hitokoto.cn/?c=a',
  fetcher,
  {
    revalidateOnFocus: false,
    onError: (e) => {
      console.error(e.message);
    }
  }
);
