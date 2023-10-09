import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';

export default function DateTag() {
  const day = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  } as const;
  const date = new Date();

  const dateText = `${getYear(date)} 年 ${getMonth(date) + 1} 月 ${getDate(date)} 日 ${day[getDay(date)]}`;

  return (
    <p className="op-60 my-1 text-3">{dateText}</p>
  );
}
