import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'

import AppComponent from './components/AppComponent'
import {store} from './store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  </React.StrictMode>
)
