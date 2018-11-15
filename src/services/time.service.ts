const add0 = (m: number) => {
  return m < 10 ? '0' + m : m;
};
const formateDate = (timeResult: any) => {
  var time = new Date(timeResult);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
};

const formateMonth = (timeResult: Date) => {
  var time = new Date(timeResult);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
};

// 获取当前星期几
const formateWeek = () => {
  var mydate = new Date();
  var myddy = mydate.getDay(); // 获取存储当前日期
  var weekday = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  return weekday[myddy];
};

// 获取当前年-月-日
const nowDate = () => {
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '年' + add0(m) + '月' + add0(d) + '日';
};

// 获取当前年-月-日 hh:mm
const nowDatehm = () => {
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + '00:00:00';
};

// 获取当前年-月-日 hh:mm
const nowDatehmpre = () => {
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + '23:59:59';
};

// 获取当前hh:mm
const nowHourMin = () => {
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();
  return add0(h) + ':' + add0(m);
};

export default {
  nowDatehm,
  nowDatehmpre,
  formateDate,
  formateMonth,
  formateWeek,
  nowDate,
  nowHourMin
};
