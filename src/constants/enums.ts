export const STATUS_MESSAGE = {
  200: '请求成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求不存在(404)',
  408: '请求超时(408)',
  500: '服务器异常(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
} as const
export type STATUS_MESSAGE_KEY = keyof typeof STATUS_MESSAGE
export type STATUS_MESSAGE_VALUE = (typeof STATUS_MESSAGE)[STATUS_MESSAGE_KEY]
