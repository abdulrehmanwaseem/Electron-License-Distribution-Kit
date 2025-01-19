import { resolve } from 'path'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// Sentry plugin configuration for error tracking and release management
const sentryPluginConfig = {
    org: 'electron-license-distribution-kit',
    project: 'desktop',

    // Uncomment and set these options when preparing for distribution, otherwise will get a warning when building:

    // authToken: import.meta.env.MAIN_VITE_SENTRY_AUTH_TOKEN, // Use token if provided
    // release: import.meta.env.MAIN_VITE_RELEASE || '1.0.0', // Optional release version
    // include: './dist',
    // sourcemaps: {
    //     assets: './**/*',
    // },
}

export default defineConfig({
    main: {
        build: {
            sourcemap: false, // Enable if you need more detailed error reports from SentryVitePlugin.
        },
        plugins: [externalizeDepsPlugin(), sentryVitePlugin(sentryPluginConfig), bytecodePlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin(), sentryVitePlugin(sentryPluginConfig), bytecodePlugin()],
        build: {
            sourcemap: false, // Enable if you need more detailed error reports from SentryVitePlugin.
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
            sourcemap: false, // Enable if you need more detailed error reports from SentryVitePlugin.
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
