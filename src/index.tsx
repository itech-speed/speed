import 'src/styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'src/components/App/App'

import store from './reducers'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
