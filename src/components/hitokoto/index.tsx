import { useHitokoto } from 'src/hooks/use-hitokoto';

export default function Hitokoto() {
  const { data, error } = useHitokoto();

  return (
    error
      ? <p>一言加载失败</p>
      : (
        <>
          {data?.hitokoto}
          <p className="text-0.75rem my-1 op-60">
            来源: {data?.from}
          </p>
        </>
      )
  );
}
