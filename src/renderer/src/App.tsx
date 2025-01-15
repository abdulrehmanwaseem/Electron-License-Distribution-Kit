import electronLogo from './assets/electron.svg'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Electron License Distribution Kit</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p>MODE: {import.meta.env.MODE}</p>
    </>
  )
}

export default App
