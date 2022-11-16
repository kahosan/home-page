import Footer from '@/components/footer';
import Hitokoto from '@/components/hitokoto';
import Services from '@/components/services';

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
  return (
    <div className="min-h-100vh pt-70px px-4 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h2>{import.meta.env.HOME_TITLE || 'NAS 数据中心'}</h2>
          <DateTag />
        </div>
        <p className="text-right text-0.9rem lt-md:w-50%">
          <Hitokoto />
        </p>
      </div>
      <div className="mt-5 p-4 w-full rd-2 dark:bg-dark-box-background bg-box-background">
        <div className="grid grid-cols-4 lt-md:grid-cols-2 ">
          <Services />
        </div>
      </div>
      <Footer />
    </div>
  );
}
