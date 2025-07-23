import axios from 'axios'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { STATUS_MESSAGE, type STATUS_MESSAGE_KEY } from '@/constants/enums'
import { getToken } from './token'
import router from '@/routes'

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

NProgress.configure({ showSpinner: false })
const abortControllerMap = new Map()

/**
 * baseURL
 *   1. 当 Dev 环境时，因为接口前缀(如: `/api`), 由 vite.config.ts 中 proxy 中转发。
 *   2. 当 Prod 环境中有多个服务地址，需要到 interceptors.request 劫持根据接口前缀, 动态修改请求地址。
 */
const baseAxiosInstance = axios.create({
  timeout: 300000,
})

baseAxiosInstance.interceptors.request.use(_requestInterceptor, (error) => {
  return Promise.reject(error)
})

baseAxiosInstance.interceptors.response.use(_responseInterceptor, _responseErrorInterceptor)

function _requestInterceptor<T>(config: InternalAxiosRequestConfig<T>) {
  NProgress.start()

  const token = getToken()
  // 如果 token 不为空且不存在自定义 token, 则为所有请求附加上 token
  if (token && !config.headers.hasAuthorization()) config.headers.setAuthorization(token)

  if (config.signal && abortControllerMap.has(config.signal)) {
    const controller = abortControllerMap.get(config.signal)
    controller.abort('因发起新请求而取消。')
  }

  const controller = new AbortController()
  config.signal = controller.signal
  abortControllerMap.set(controller.signal, controller)

  return config
}

function _responseInterceptor(response: AxiosResponse) {
  const url = response.config.url
  abortControllerMap.delete(url)

  NProgress.done()

  const { code, msg } = response?.data || {}

  if (code === 401) {
    message.error('未授权或登录过期, 请重新登录')

    setTimeout(() => {
      router.navigate('/login', { replace: true })
    }, 1000)
  } else if (code !== 200) {
    throw new Error(msg || STATUS_MESSAGE[code as STATUS_MESSAGE_KEY] || '请求失败')
  }

  return response.data
}

function _responseErrorInterceptor(error: AxiosError) {
  if (axios.isCancel(error)) {
    // 请求被取消
  }

  const { response } = error
  message.error(STATUS_MESSAGE[response?.status as STATUS_MESSAGE_KEY] || '请求失败')

  return Promise.reject(error)
}
