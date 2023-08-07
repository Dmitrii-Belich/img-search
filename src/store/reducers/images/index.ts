import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchImages} from '../../../actions/images'
import {ImagesState} from '../../../types/images'
import {FetchImagesActionPayload} from '../../../types/images'


const initialState: ImagesState = {
  term: '',
  images: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    clearImages() {
      return {...initialState}
    }
  },
  extraReducers: {
    [fetchImages.pending.type]: (state, action) => {
      state.loading = true
      state.error = null
    },
    [fetchImages.fulfilled.type]: (state, action: PayloadAction<FetchImagesActionPayload>) => {
      state.term = action.payload.term
      state.images = action.payload.photos.page === 1
                     ? action.payload.photos.photo
                     : [...state.images, ...action.payload.photos.photo]
      state.totalPages = action.payload.photos.pages
      state.currentPage = action.payload.photos.page
      state.loading = false
    },
    [fetchImages.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export default imagesSlice.reducer
