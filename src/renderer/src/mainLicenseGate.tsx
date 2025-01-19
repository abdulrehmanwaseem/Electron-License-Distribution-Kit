import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import LicenseGate from './components/LicenseGate'
import * as Sentry from '@sentry/electron/renderer'
// import Topbar from './components/Topbar'

Sentry.init({
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.1,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LicenseGate />
    </React.StrictMode>
)
