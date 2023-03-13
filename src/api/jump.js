/**
 * 登录界面和后台管理页面跳转
 * 注意：仅页面跳转，没有登入登出与后端通讯
 */
const { VUE_APP_BACK_LOCATION, VUE_APP_LOGIN_LOCATION, VUE_APP_BASE_URL } = process.env

export function goToLoginPage() {
  location.replace(VUE_APP_BASE_URL + VUE_APP_LOGIN_LOCATION)
}

export function goToBackPage() {
  location.replace(VUE_APP_BASE_URL + VUE_APP_BACK_LOCATION)
}