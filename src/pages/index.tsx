import Button from '@/components/button';
import Hitokoto from '@/components/hitokoto';
import Services from '@/components/services';

import { useEditServices } from '@/hooks/use-edit-services';

function DateTag() {
  const date = new Date();

  const day = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  } as const;

  const text = `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日 ${day[date.getDay() as keyof typeof day]}`;

  return (
    <p className="op-60 my-1 text-3">{text}</p>
  );
}

export default function DataCenterPage() {
  const { edit, setEdit } = useEditServices();

  return (
    <div className="min-h-[calc(100vh-70px)] pt-70px px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2>NAS 数据中心</h2>
          <DateTag />
        </div>
        <p className="text-right text-0.9rem lt-md:w-50%">
          <Hitokoto />
        </p>
      </div>
      <div className="mt-5 p-4 w-full rd-2 dark:bg-dark-box-background bg-box-background">
        <div className="flex justify-between items-center">
          <h3>在线服务</h3>
          <div>
            <Button onClick={() => setEdit(!edit)}>编辑</Button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-4 lt-md:grid-cols-2 ">
          <Services />
        </div>
      </div>
    </div>
  );
}
