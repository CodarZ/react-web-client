/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**网站前缀 */
  readonly VITE_BASE_URL: string

  /** 请求服务器地址 */
  readonly VITE_API_SERVICE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
