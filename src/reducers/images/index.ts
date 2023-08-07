import {ImagesState} from '../../types/reducers/images'
import {ImageAction, imageActions} from '../../types/reducers/images/actions'


const initialState: ImagesState = {
  term: '',
  images: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0
}
export default function imagesReducer(state = initialState, action: ImageAction): ImagesState {
  switch (action.type) {
    case imageActions.IMAGES_LOADING:
      return {...state, loading: true, error: null}
    case imageActions.IMAGES_SEARCH_FETCH:
      return {
        ...state,
        term: action.payload.term,
        images: [...state.images, ...action.payload.photos.photo],
        totalPages: action.payload.photos.pages,
        currentPage: action.payload.photos.page,
        loading: false
      }
    case imageActions.CLEAR_IMAGES:
      return {...initialState, loading: state.loading}
    case imageActions.FETCH_IMAGES_ERROR:
      return {...state, loading: false, error: action.error}
    default:
      return state
  }
}
