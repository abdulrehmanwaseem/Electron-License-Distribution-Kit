import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Topbar from './components/Topbar'
// import MacTopbar from './components/MacTopbar'

import * as Sentry from '@sentry/electron/renderer'

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
        <>
            <Topbar title="Electron License Distribution Kit" />
            {/* <MacTopbar title="Electron License Distribution Kit" /> */}

            <App />
        </>
    </React.StrictMode>
)
