import './index.css'

import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../types/reducers'

import SearchString from '../SearchString'
import SearchResults from '../SearchResults'


function MainComponent() {
  const {
    images,
    error,
    loading,
  } = useSelector((state: RootState) => state.images)


  return (<section className={`main ${(images.length || error || loading) && 'resulted'}`}>
      <SearchString></SearchString>

      <SearchResults></SearchResults>
    </section>
  )
}

export default MainComponent
