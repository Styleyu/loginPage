import axios from "axios"
import { getToken } from "./localstorage"

export const api = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 如果有TOKEN，添加TOKEN
 */
api.interceptors.request.use(config => {
  let token = getToken()
  if(token != null){
    config.headers.set('X-Token', token)
  }
  return config
})

/**
 * 响应结构:
 * code 200成功
 * msg
 * data
 */
api.interceptors.response.use(res => {
  const { data, code, msg } = res.data
  if (code == 200) {
    return data
  } else {
    throw msg
  }
}, err => {
  throw err
})
