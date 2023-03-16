const addZero = (n) => n < 10 ? ('0' + n) : n
/**
 * 日期转字符串 y-M-d hh:mm:ss
 * e.g. 2014-12-1 01:20:01
 * @param {Date} date 
 * @param { 'd' | 'h' | 'm' | 's' } precis 精确到天/时/分/秒（默认s）
 */
export const dateToString = (date, precis = 's') => {
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  const h = addZero(date.getHours())
  const m = addZero(date.getMinutes())
  const s = addZero(date.getSeconds())
  let res = y + '-' + M + '-' + d
  switch(s){
    case 'h': case 'm': case 's':
      res += ' ' + h
    case 'm': case 's':
      res += ':' + m
    case 's':
      res += ':' + s
      break
    default:
  }
  console.log(res)
  return res
}