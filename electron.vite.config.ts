import { resolve } from 'path'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    main: {
        build: {
            sourcemap: true,
        },
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
        build: {
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
        plugins: [react()],
    },
})
