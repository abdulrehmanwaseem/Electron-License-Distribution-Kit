import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Topbar from './components/Topbar'
// import MacTopbar from './components/MacTopbar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            <Topbar title="Electron License Distribution Kit" />
            {/* <MacTopbar title="Electron License Distribution Kit" /> */}

            <App />
        </>
    </React.StrictMode>
)
