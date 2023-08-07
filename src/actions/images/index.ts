import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {
  FetchImagesActionPayload
} from '../../types/images'


const API_KEY = '2fffc389367d2feb91ee834c817367db'
const BASE_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&extras=date_upload,url_m,url_o&format=json&nojsoncallback=1'

let timeoutId: null | number = null

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  (
    {text = '', page = 1, debounce = 500}: { text: string, page?: number, debounce?: number },
    thunkAPI
  ):
  Promise<FetchImagesActionPayload> =>
    new Promise((res, rej) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      if (!text) {
        res({photos: {photo: [], page: 0, pages: 0}, term: ''} as FetchImagesActionPayload)
      } else {
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

            res({photos: response.photos, term: text} as FetchImagesActionPayload)
          } catch (error: any) {
            rej(thunkAPI.rejectWithValue(error.message))
          }
        }, debounce)
      }
    })
)
