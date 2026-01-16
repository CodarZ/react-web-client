/// <reference types="vite/client" />

type ViteTypeOptions = {
  strictImportMetaEnv: unknown;
};

interface ImportMetaEnv {
  /** 网站前缀 */
  readonly VITE_BASE_URL: string;
  /** Mock 功能开关 - 'true' | 'false' */
  readonly VITE_USE_MOCK: string;
  /** API 基础地址 */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
