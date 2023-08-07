import './index.css'

import React, {useEffect, useState} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'
import {useDispatch} from 'react-redux'

import {fetchImages} from '../../actions/images'

function SearchString() {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>()
  const [searchString, setSearchString] = useState('')

  const inputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value)
  }

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  useEffect(() => {
    dispatch(fetchImages(searchString))
  }, [searchString, dispatch])

  return (
    <form
      className={`search-string ${searchString.length && 'search-string--filed'}`}
      onSubmit={submitHandler}
    >
      <input
        value={searchString}
        onInput={inputHandler}
        className="search-string__input"
        type="search"
        placeholder="найдётся всё"
      />
      <button
        className="search-string__clear"
        type="reset"
        onClick={() => setSearchString('')}
      >
        <svg
          viewBox="0 0 32 32" width="32" height="32" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd" clipRule="evenodd"
            d="M23.66 6.96 16 14.63 8.32 6.96 6.95 8.33 14.62 16l-7.67 7.67 1.37 1.37 7.67-7.68 7.67 7.68 1.37-1.37L17.36 16l7.67-7.67-1.37-1.37Z"
            fill="inherit"
          ></path>
        </svg>
      </button>
    </form>
  )
}

export default SearchString