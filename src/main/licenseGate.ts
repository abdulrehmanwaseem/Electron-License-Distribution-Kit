import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

async function gateCreateWindowWithLicense(createWindow, icon) {
    const isDev = import.meta.env.DEV

    const licenseGateWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 520,
        height: 415,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/licenseGate.js'),
            sandbox: false,
            devTools: isDev,
        },
    })

    if (isDev) {
        licenseGateWindow.webContents.openDevTools({ mode: 'detach' })
    }

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        licenseGateWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/licenseGate.html`)
    } else {
        licenseGateWindow.loadFile(join(__dirname, '../renderer/licenseGate.html'))
    }

    ipcMain.handle('GATE_SUBMIT', async (_event, test) => {
        if (test === 'test') {
            // Close the license gate window
            licenseGateWindow.close()

            // Launch our main window
            createWindow()

            return true
        }

        return false
    })
}

export default gateCreateWindowWithLicense
