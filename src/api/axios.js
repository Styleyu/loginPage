import axios from "axios"

export const api = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 响应结构:
 * code 0成功
 * msg
 * data
 */
api.interceptors.response.use(res => {
  const { data, code, msg } = res.data
  if (code === 0) {
    return data
  } else {
    throw msg
  }
}, err => {
  throw err
})

