import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import Store from 'electron-store'

type StoreSchema = {
    licenseKey: string
}

let licenseGateWindow: BrowserWindow | null = null

// Paths where electron-store, store's data:

// Operating System	    Default Path
// Windows             	%APPDATA%/<app-name>/config.json
// macOS	            ~/Library/Application Support/<app-name>/config.json
// Linux	            ~/.config/<app-name>/config.json

const store = new Store<StoreSchema>()

async function validateLicenseKey(key: string): Promise<string | null> {
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

async function gateCreateWindowWithLicense(
    createWindow: () => void,
    mainWindow: BrowserWindow | null,
    icon = '',
    isDev = false
) {
    // Check if a valid license key exists in the store
    const storedKey = store.get('licenseKey')
    if (storedKey) {
        const code = await validateLicenseKey(storedKey)
        if (code === 'VALID') {
            if (!mainWindow) {
                // Only create the main window if it doesn't exist
                createWindow()
            }
            return
        } else {
            store.delete('licenseKey') // Remove the invalid key
        }
    }

    licenseGateWindow = new BrowserWindow({
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

    licenseGateWindow.on('closed', () => {
        licenseGateWindow = null
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
            store.set('licenseKey', key)

            // Close the license gate window
            licenseGateWindow?.close()

            // Launch our main window
            createWindow()

            return true
        }

        return false
    })
}

export default gateCreateWindowWithLicense
