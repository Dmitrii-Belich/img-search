import './index.css'

import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

import AppComponent from './components/AppComponent'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))


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
