import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'

async function gateCreateWindowWithLicense(createWindow) {
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

    ipcMain.on('GATE_SUBMIT', async (_event, { key }) => {
        // Close the license gate window
        licenseGateWindow.close()

        // Launch our main window
        createWindow()
    })
}

export default gateCreateWindowWithLicense
