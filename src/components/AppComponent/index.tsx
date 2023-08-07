import './index.css'

import React from 'react'
import {Provider} from 'react-redux'
import {store} from '../../store'

import MainComponent from '../MainComponent'
import HeaderComponent from '../HeaderComponent'


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
