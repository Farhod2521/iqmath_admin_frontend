/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URI: string
  readonly VITE_BACKEND_UZKAD_FILE_URL: string
  readonly VITE_BACKEND_FILE_URI: string
  readonly VITE_EIMZO_KEY: string
  readonly VITE_TEST_EIMZO_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
