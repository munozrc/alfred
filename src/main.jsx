import React from 'react'
import ReactDOM from 'react-dom/client'
import TerminalProvider from './contexts/TerminalContext'
import Terminal from './components/Terminal'

import './index.css'

const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)

reactRoot.render(
  <TerminalProvider>
    <Terminal />
  </TerminalProvider>
)
