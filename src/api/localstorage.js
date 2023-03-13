/**
 * 与本地存储相关的api
 * 默认会自动序列化
 * 使用localStorage保证始终使用该api，后期可能会写日志
 */

/**
 * localstorage的key value映射
 */
export const STORAGE_KEY = {
  TOKEN: '__TOKEN__'
}

/**
 * 读取
 * @param {string} key 
 * @param {boolean} 是否需要解析成object，若true，返回object，若解析失败，抛出异常
 */
export function getLocal(key, needParse) {
  // @todo: 后期会写日志等
  let obj = localStorage.getItem(key)
  needParse && (obj = JSON.parse(obj))
  return obj
}
/**
 * 
 * @param {string} key 
 * @param {any} value
 */
export function setLocal(key, value) {
  value == undefined && (value = null)
  // @todo: 后期会写日志等
  return localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 读取token
 * @returns 无则返回null
 */
export function getToken() {
  return getLocal(STORAGE_KEY.TOKEN)
}

/**
 * 
 * @param {string} tokenString 
 */
export function writeToken(tokenString) {
  setLocal(STORAGE_KEY.TOKEN, tokenString)
}