import { Loading } from '@geist-ui/core';
import { useHitokoto } from 'src/hooks/use-hitokoto';

export default function Hitokoto() {
  const { data, error } = useHitokoto();

  if (error)
    return <p>一言加载失败</p>;

  return (
    data?.hitokoto
      ? (
        <>
          {data.hitokoto}
          <p className="text-0.75rem my-1 op-60">
            来源: {data.from}
          </p>
        </>
      )
      : (
        <div className="">
          一言加载中
          <Loading />
        </div>
      )
  );
}
