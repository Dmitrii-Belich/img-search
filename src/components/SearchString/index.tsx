import './index.css'

import React from 'react'

import {useAppDispatch, useAppSelector} from '../../hooks'
import useSearchQuery from '../../hooks/useSearchQuery'

import {searchTermSlice} from '../../store/reducers/searchTerm'

function SearchString() {
  useSearchQuery()

  const {setSearchTerm} = searchTermSlice.actions
  const searchTerm = useAppSelector(state => state.searchTerm)
  const dispatch = useAppDispatch()

  const inputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(evt.target.value))
  }

  const clearHandler = () => {
    dispatch(setSearchTerm(''))
  }

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  return (
    <form
      className={`search-string ${searchTerm.length && 'search-string--filed'}`}
      onSubmit={submitHandler}
    >
      <input
        value={searchTerm}
        onInput={inputHandler}
        className="search-string__input"
        placeholder="найдётся всё"
      />
      <button
        className="search-string__clear"
        type="reset"
        onClick={clearHandler}
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
