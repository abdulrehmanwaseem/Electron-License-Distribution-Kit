import { resolve } from 'path'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

const sentryPluginConfig = {
    org: 'electron-license-distribution-kit',
    project: 'desktop',
    ...(import.meta.env.SENTRY_AUTH_TOKEN
        ? {
              authToken: import.meta.env.MAIN_VITE_SENTRY_AUTH_TOKEN, // Use token if provided
              release: import.meta.env.MAIN_VITE_RELEASE || '1.0.0', // Optional release version
              include: './dist',
              sourcemaps: {
                  assets: './**/*',
              },
          }
        : {}),
}

export default defineConfig({
    main: {
        build: {
            sourcemap: true,
        },
        plugins: [externalizeDepsPlugin(), sentryVitePlugin(sentryPluginConfig), bytecodePlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin(), sentryVitePlugin(sentryPluginConfig), bytecodePlugin()],
        build: {
            sourcemap: true,
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/preload/index.ts'),
                    licenseGate: resolve(__dirname, 'src/preload/licenseGate.ts'),
                },
            },
        },
    },
    renderer: {
        build: {
            sourcemap: true,
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/renderer/index.html'),
                    licenseGate: resolve(__dirname, 'src/renderer/licenseGate.html'),
                },
            },
        },
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
            },
        },
        plugins: [react(), sentryVitePlugin(sentryPluginConfig)],
    },
})
