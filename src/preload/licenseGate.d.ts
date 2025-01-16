interface Api {
  licenseGateHandler: (licenseKey: string) => Promise<unknown>
}

declare global {
  interface Window {
    api: Api
  }
}
