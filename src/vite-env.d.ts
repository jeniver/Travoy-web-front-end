/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_GA_TRACKING_ID: string
  readonly VITE_HOTJAR_ID: string
  readonly VITE_ENABLE_PWA: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_OFFLINE: string
  readonly VITE_ENABLE_PERFORMANCE_MONITORING: string
  readonly VITE_ENABLE_LAZY_LOADING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
