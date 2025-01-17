import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import gateCreateWindowWithLicense from './licenseGate'
import * as Sentry from '@sentry/electron/main'

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
}

Sentry.init({
    dsn: 'https://dc81e33a46bacf3528dd039f97fdeb18@o4508669317218304.ingest.us.sentry.io/4508669319839744',
})

const isDev = import.meta.env.DEV

let mainWindow: BrowserWindow | null = null

// Main Window
function createWindow(): void {
    console.log(__dirname, 'DIR', app.getAppPath())
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        autoHideMenuBar: true,
        frame: false,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            devTools: isDev,
        },
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow?.show()
    })

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    // *Disable developer tools in production
    if (!isDev) {
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow?.webContents.closeDevTools()
        })
    }

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html`)
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // Open main window after license window
    gateCreateWindowWithLicense(createWindow, mainWindow, icon, isDev)
    // createWindow()

    // Topbar functionality handlers:
    ipcMain.on('close-window', () => {
        const currentWindow = BrowserWindow.getFocusedWindow()

        if (currentWindow) {
            currentWindow.close()
        }
    })
    ipcMain.on('fullscreen-window', () => {
        const currentWindow = BrowserWindow.getFocusedWindow()

        if (currentWindow) {
            const isFullscreen = currentWindow.isFullScreen()
            currentWindow.setFullScreen(!isFullscreen) // Toggle fullscreen
        }
    })
    ipcMain.on('minimize-window', () => {
        const currentWindow = BrowserWindow.getFocusedWindow()

        if (currentWindow) {
            currentWindow.minimize()
        }
    })

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
