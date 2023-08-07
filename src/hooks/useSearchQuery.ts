import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {searchTermSlice} from '../store/reducers/searchTerm'
import {useAppDispatch, useAppSelector} from './index'

export default function useSearchQuery () {
  const {setSearchTerm} = searchTermSlice.actions
  const searchTerm = useAppSelector(state => state.searchTerm)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const q = queryParams.get('q')
    if (q) {
      dispatch(setSearchTerm(q))
    }
  }, [dispatch, location.search, setSearchTerm])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set('q', searchTerm)
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
  }, [location.pathname, location.search, navigate, searchTerm])
}

