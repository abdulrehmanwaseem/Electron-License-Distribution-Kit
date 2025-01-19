import { resolve } from 'path'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    main: {
        build: {
            sourcemap: false, // Turning source map false for now, because of warning from bytecodePlugin
        },
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
        build: {
            sourcemap: false,
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
            sourcemap: false,
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
        plugins: [react()],
    },
})
