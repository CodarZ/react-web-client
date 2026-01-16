import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import type { ApiResponse, ExtendedAxiosRequestConfig } from './types';

/**
 * 请求拦截器 - 添加 Token
 */
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const extendedConfig = config as InternalAxiosRequestConfig & ExtendedAxiosRequestConfig;

  // 如果配置了 skipAuth，则不添加 Token
  if (extendedConfig.skipAuth) {
    return config;
  }

  // TODO: 从状态管理或 localStorage 获取 token
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * 请求错误处理
 */
const requestErrorHandler = (error: AxiosError) => {
  console.error('[Request Error]', error);
  return Promise.reject(error);
};

/**
 * 响应拦截器
 */
const responseInterceptor = (response: AxiosResponse<ApiResponse>) => {
  // 可以在此处进行统一的响应处理
  // 例如：检查业务状态码
  const { data } = response;

  // 如果后端返回了业务错误码，可以在这里处理
  if (data && data.code !== 0 && data.code !== 200) {
    // 可以选择在这里抛出错误或者记录日志
    console.warn(`[API Warning] code: ${data.code}, msg: ${data.msg}`);
  }

  return response;
};

/**
 * 响应错误处理
 */
const responseErrorHandler = (error: AxiosError<ApiResponse>) => {
  const extendedConfig = error.config as ExtendedAxiosRequestConfig | undefined;

  // 如果配置了 skipErrorMessage，则不显示错误提示
  if (extendedConfig?.skipErrorMessage) {
    return Promise.reject(error);
  }

  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        // TODO: 处理未授权，如跳转登录页
        console.warn('[401] 未授权，请重新登录');
        break;
      case 403:
        console.warn('[403] 权限不足');
        break;
      case 404:
        console.warn('[404] 资源不存在');
        break;
      case 500:
        console.error('[500] 服务器内部错误');
        break;
      default:
        console.error(`[${status}] 请求失败: ${data?.msg || error.message}`);
    }
  } else if (error.request) {
    console.error('[Network Error] 网络错误，请检查网络连接');
  }

  return Promise.reject(error);
};

/**
 * 应用拦截器到 Axios 实例
 */
export const applyInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(requestInterceptor, requestErrorHandler);
  instance.interceptors.response.use(responseInterceptor, responseErrorHandler);
};
