import 'src/styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/components/App'
import { GameContextProvider } from 'src/components/Context_Game'

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
