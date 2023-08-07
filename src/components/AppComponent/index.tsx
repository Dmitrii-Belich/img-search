import './index.css'

import React from 'react'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from '../../reducers'

import MainComponent from '../MainComponent'
import HeaderComponent from '../HeaderComponent'

const store = createStore(rootReducer, applyMiddleware(thunk))

function AppComponent() {
  return (
    <Provider store={store}>
      <div className="App">
        <HeaderComponent></HeaderComponent>

        <MainComponent></MainComponent>
      </div>
    </Provider>
  )
}

export default AppComponent
