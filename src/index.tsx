import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'

import AppComponent from './components/AppComponent'
import {store} from './store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppComponent/>
      </Provider>
    </Router>
  </React.StrictMode>
)
