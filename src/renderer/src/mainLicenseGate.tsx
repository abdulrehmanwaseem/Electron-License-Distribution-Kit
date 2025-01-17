import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import LicenseGate from './components/LicenseGate'
// import Topbar from './components/Topbar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LicenseGate />
    </React.StrictMode>
)
