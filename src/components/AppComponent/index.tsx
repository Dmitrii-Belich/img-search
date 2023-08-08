import './index.css'

import React from 'react'

import MainComponent from '../MainComponent'
import HeaderComponent from '../HeaderComponent'


function AppComponent() {
  return (
      <div className="App">
        <HeaderComponent></HeaderComponent>

        <MainComponent></MainComponent>
      </div>
  )
}

export default AppComponent
