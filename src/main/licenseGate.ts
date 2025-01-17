import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

async function validateLicenseKey(key) {
    // Demo api link for idea:
    const DEMO_API = `https://api.keygen.sh/v1/accounts/demo/licenses/actions/validate-key`

    const validation = await fetch(`${import.meta.env.MAIN_VITE_KEYGEN_API_KEY}` || DEMO_API, {
        method: 'POST',
        headers: {
            'content-type': 'application/vnd.api+json',
            accept: 'application/vnd.api+json',
        },
        body: JSON.stringify({
            meta: { key },
        }),
    })
    const { meta, errors } = await validation.json()
    console.log(errors)
    if (errors) {
        return null
    }

    return meta.code
}

async function gateCreateWindowWithLicense(createWindow, icon = '', isDev = false) {
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

    ipcMain.handle('GATE_SUBMIT', async (_event, key) => {
        const code = await validateLicenseKey(key)
        console.log(code)

        if (code === 'VALID') {
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
