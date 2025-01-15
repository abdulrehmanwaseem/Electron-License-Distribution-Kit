/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_TEST: string
  readonly VITE_API_KEY?: string
  readonly PRELOAD_VITE_API_KEY?: string
  readonly RENDERER_VITE_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
