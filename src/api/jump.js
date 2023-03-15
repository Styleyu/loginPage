/**
 * 页面跳转
 * 注意：仅页面跳转，没有登入登出与后端通讯
 */
const { VUE_APP_BACK_LOCATION, VUE_APP_LOGIN_LOCATION, VUE_APP_BASE_URL } = process.env

/**
 * 跳转到登录界面
 */
export const goToLoginPage = () => {
  location.replace(VUE_APP_BASE_URL + VUE_APP_LOGIN_LOCATION)
}

/**
 * 跳转到后台界面
 */
export const goToBackPage = () => {
  location.replace(VUE_APP_BASE_URL + VUE_APP_BACK_LOCATION)
}

/**
 * 前端路由跳转使用，解析后台管理地址
 * @param {string} absolutePath 绝对地址 如/user/detail
 * e.g. /user/detail将被解析为类似/back/user/detail
 */
export const resolveBackRoutePath = (absolutePath) => {
  return "/" + VUE_APP_BACK_LOCATION + absolutePath
}