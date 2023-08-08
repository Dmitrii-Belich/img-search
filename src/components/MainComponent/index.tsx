import './index.css'

import React from 'react'

import {useAppSelector} from '../../hooks'

import SearchString from '../SearchString'
import SearchResults from '../SearchResults'


function MainComponent() {
  const searchTerm = useAppSelector((state) => state.searchTerm)


  return (<section
      className={`main ${searchTerm && 'resulted'}`}
    >
      <SearchString></SearchString>

      <SearchResults></SearchResults>
    </section>
  )
}

export default MainComponent
