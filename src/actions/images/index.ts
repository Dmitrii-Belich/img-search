import {AnyAction} from 'redux'
import axios from 'axios'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
  FetchImagesAction,
  FetchImagesActionPayload, FetchImagesErrorAction,
  FetchImagesNoPayloadAction,
  imageActions
} from '../../types/reducers/images/actions'

const API_KEY = '2fffc389367d2feb91ee834c817367db'
const BASE_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&extras=date_upload,url_m,url_o&format=json&nojsoncallback=1'

export const imagesLoading = (): FetchImagesNoPayloadAction => ({
  type: imageActions.IMAGES_LOADING
})
export const setImages = (payload: FetchImagesActionPayload): FetchImagesAction => ({
  type: imageActions.IMAGES_SEARCH_FETCH,
  payload
})

export const setImagesError = (error: string): FetchImagesErrorAction => ({
  type: imageActions.FETCH_IMAGES_ERROR,
  error
})
export const clearImages = (): FetchImagesNoPayloadAction => ({
  type: imageActions.CLEAR_IMAGES
})

let timeoutId: null | number = null

export const fetchImages = (text = '', page = 1, debounce = 500):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  if (!text) {
    dispatch(clearImages())
  } else  {
    dispatch(imagesLoading())
    timeoutId = window.setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}&api_key=${API_KEY}&text=${text}&page=${page}`
        ).then(res => {
          if (res.status === 200 && res.data?.stat === 'ok') {
            return res.data
          } else {
            throw Error(res.statusText || res.data?.message)
          }
        })

        if (!timeoutId) return

        dispatch(setImages({photos: response.photos, term: text}))
      } catch (error: any) {
        dispatch(setImagesError(error.message))
      }
    }, debounce)
  }
}
