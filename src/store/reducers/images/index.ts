import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Image, ImagesState} from '../../../types/images'


const initialState: ImagesState = {
  text: '',
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
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload
    },
    setImages(state, action: PayloadAction<Image[]>) {
      state.images = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    }
  }
})

export default imagesSlice.reducer
