const { VUE_APP_BACK_LOCATION, VUE_APP_LOGIN_LOCATION, VUE_APP_BASE_URL } = process.env

export const goToLoginPage = () => {
  location.replace(VUE_APP_BASE_URL + VUE_APP_LOGIN_LOCATION)
}

export const goToBackPage = () => {
  location.replace(VUE_APP_BASE_URL + VUE_APP_BACK_LOCATION)
}