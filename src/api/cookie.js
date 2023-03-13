/**
 * 与cookie相关的api
 * 使用cookie保证始终使用该api，后期可能会写日志
 */

/**
 * cookie的key value映射
 */
export const COOKIE_KEY = {

}

/**
 * 
 * @param {string} key 
 * @returns 找不到返回null
 */
export function getCookie(key) {
  // @todo: 后期会写日志等
  try {
    let value = document.cookie.match(new RegExp('\\b' + key + '\\b' + '=([^;]*);'))[1]
    if (value === '') return null
    return value
  } catch (e) {
    return null
  }
}
/**
 * 设置cookie
 * @param {string} key 
 * @param {string} value
 * @param {Date} expires 过期时间，默认浏览器关闭即删除
 */
export function setCookie(key, value, expires = '') {
  // @todo: 后期会写日志等
  document.cookie = `${key}=${value}; ${expires ? 'expires=' + expires : ''};`
}

/**
 * 删除cookie
 * @param {string} key 
 */
export function delCookie(key) {
  document.cookie = `${key}=; expires=${new Date()};`
}