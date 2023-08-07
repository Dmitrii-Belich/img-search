import './index.css'

import React from 'react'
import {useAppSelector} from '../../hooks'

import SearchString from '../SearchString'
import SearchResults from '../SearchResults'


function MainComponent() {
  const {
    images,
    error,
    loading
  } = useAppSelector((state) => state.images)


  return (<section className={`main ${(images.length || error || loading) && 'resulted'}`}>
      <SearchString></SearchString>

      <SearchResults></SearchResults>
    </section>
  )
}

export default MainComponent
