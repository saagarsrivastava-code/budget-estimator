import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { FlowProvider } from './state/FlowContext.jsx'
import './styles/global.css'
import './styles/components.css'

// StrictMode intentionally omitted: its dev-only double mount/unmount drops
// framer-motion's initial→animate transitions, leaving opacity:0 content stuck
// invisible. Screens still animate reliably (CSS keyframe + framer children).
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <FlowProvider>
      <App />
    </FlowProvider>
  </HashRouter>,
)
