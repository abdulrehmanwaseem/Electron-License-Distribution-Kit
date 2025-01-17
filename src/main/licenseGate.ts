import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

async function gateCreateWindowWithLicense(createWindow) {
  const isDev = import.meta.env.DEV

  const gateWindow = new BrowserWindow({
    resizable: false,
    frame: false,
    width: 420,
    height: 200,
    webPreferences: {
      preload: join(__dirname, '../preload/licenseGate.js'),
      devTools: isDev
    }
  })

  gateWindow.loadFile(join(__dirname, '../renderer/licenseGate.html'))

  if (isDev) {
    gateWindow.webContents.openDevTools({ mode: 'detach' })
  }

  ipcMain.on('GATE_SUBMIT', async (_event, { key }) => {
    // Close the license gate window
    gateWindow.close()

    // Launch our main window
    createWindow()
  })
}

export default gateCreateWindowWithLicense
