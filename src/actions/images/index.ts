import {AnyAction} from 'redux'
import axios from 'axios'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {FetchImagesNoPayloadAction, imageActions} from '../../types/reducers/images/actions'

const API_KEY = '2fffc389367d2feb91ee834c817367db'

export const clearImages = (): FetchImagesNoPayloadAction => ({
  type: imageActions.CLEAR_IMAGES
})

let timeoutId: null | number = null

export const fetchImages = (text = '', page = 1, debounce = 300):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  if (timeoutId) clearTimeout(timeoutId)
  if (text) {
    dispatch({type: imageActions.IMAGES_LOADING})
    if (page === 1) {
      dispatch(clearImages())
    }
    timeoutId = window.setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${text}&extras=date_upload,url_m,url_o&format=json&nojsoncallback=1&page=${page}`
        ).then(res => {
          if (res.status === 200 && res.data?.stat === 'ok') {
            return res.data
          } else {
            throw Error(res.statusText || res.data?.message)
          }
        })

        dispatch({type: imageActions.IMAGES_SEARCH_FETCH, payload: {photos: response.photos, term: text}})
      } catch (error: any) {
        dispatch({type: imageActions.FETCH_IMAGES_ERROR, error: error.message})
      }
    }, debounce)
  } else {
    dispatch(clearImages())
  }
}
