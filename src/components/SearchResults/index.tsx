import './index.css'

import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'

import {fetchImages} from '../../actions/images'

import {RootState} from '../../types/reducers'
import {throttle} from '../../utils'

function SearchResults() {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>()
  const {
    images,
    loading,
    error,
    currentPage,
    totalPages,
    term
  } = useSelector((state: RootState) => state.images)

  const isPreloaderVisible = useCallback(
    () => (!error && currentPage && (currentPage !== totalPages)) || loading,
    [error, currentPage, totalPages, loading]
  )
  const scrollHandler = useCallback(() => {
    if (images.length
      && !loading
      && (window.scrollY > (document.documentElement.scrollHeight - window.innerHeight * 2))
      && currentPage < totalPages
    ) {
      dispatch(fetchImages(term, currentPage + 1, 0))
    }
  }, [loading, images, currentPage, totalPages, dispatch, term])

  useEffect(() => {
    const throttledHandler = throttle(scrollHandler, 100)
    document.addEventListener('scroll', throttledHandler)

    return () => document.removeEventListener('scroll', throttledHandler)
  }, [scrollHandler])

  return (
    <section className="search-results">
      {!error
       ? <>
         <div className="search-results__container">
           {images.map((image, i) => {
             return <div key={image.id + i} className="search-results__item">
               <img
                 src={image.url_m}
                 alt={image.title} loading="lazy"
                 className="search-results__img"
               />
               <div className="search-results__title">{image.title}</div>
               <div className="search-results__date">{new Date(+image.dateupload * 1000).toLocaleDateString()}</div>
               <a
                 target="_blank"
                 rel="noreferrer"
                 href={image.url_o}
                 className="search-results__download"
               >
                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <g fill="#fff">
                     <path
                       d="M12.553 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.108-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013l-4 4.375Z"
                     />
                     <path
                       d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191Z"
                     />
                   </g>
                 </svg>
               </a>
             </div>
           })
           }
         </div>

         {isPreloaderVisible()
          ? <div className="preloader"></div>
          : ''}
       </>
       : <div className="search-results__error">
         Произошла ошибка: &quot;{error}&quot; <br/>
         Перезагрузите страницу или попробуйте позже
       </div>}
    </section>
  )
}

export default SearchResults
