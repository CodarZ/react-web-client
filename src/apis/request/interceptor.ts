import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { message } from '@/libs/antd-static';
import { useUserStore } from '@/stores/useUserStore';

/** HTTP 状态码对应的默认错误信息 */
export const STATUS_MESSAGE: Record<number, string> = {
  400: '请求错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求不存在',
  408: '请求超时',
  500: '服务器异常',
  501: '服务未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
};

/** 请求拦截器 */
export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
}

/** 请求错误处理 */
export function requestErrorInterceptor(error: AxiosError) {
  return Promise.reject(error);
}

/** 响应拦截器 */
export function responseInterceptor(response: AxiosResponse) {
  const isBinaryResponse =
    response.request?.responseType === 'blob' || response.request?.responseType === 'arraybuffer';
  if (isBinaryResponse) {
    return response;
  }

  const res = response.data;
  if (res?.code === 200) return response;
  if (res?.code === 401) handleUnauthorized();

  const errorMsg = showErrorMessage(res?.msg, res?.code);

  return Promise.reject(new Error(errorMsg));
}

/** 响应错误拦截器 */
export function responseErrorInterceptor(error: AxiosError) {
  if (error.code === 'ERR_CANCELED') return Promise.reject(error);

  const { response } = error;
  const backendMsg = (response?.data as { msg?: string })?.msg;
  showErrorMessage(backendMsg, response?.status);

  if (response?.status === 401) handleUnauthorized();

  return Promise.reject(error);
}

/** 处理 401 等未授权情况 */
function handleUnauthorized(): void {
  useUserStore.getState().logout();
}

/**
 * 展示错误消息
 * @param msg 错误消息
 * @param code 可选的业务码/状态码，用于获取默认消息
 */
function showErrorMessage(msg?: string, code?: number): string {
  const fallbackMsg = code ? STATUS_MESSAGE[code] : undefined;
  const displayMsg = msg || fallbackMsg || '系统未知错误';
  message.error(displayMsg);
  return displayMsg;
}
