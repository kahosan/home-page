import { useAnimeHitokoto } from '@/hooks/use-anime-hitokoto';

export default function Hitokoto() {
  const { data, error } = useAnimeHitokoto();

  return (
    error
      ? <p>一言加载失败</p>
      : (
        <>
          {data?.hitokoto}
          <div className="text-0.75rem pt-2 pr-2 op-60">
            来源: {data?.from}
          </div>
        </>
      )
  );
}
