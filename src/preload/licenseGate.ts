import { contextBridge, ipcRenderer } from 'electron'

const api = {
  licenseGateHandler: (licenseKey: string) => ipcRenderer.invoke('GATE_SUBMIT', licenseKey)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
