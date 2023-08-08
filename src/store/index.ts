import {configureStore} from '@reduxjs/toolkit'

import {ImageAPI} from '../services/ImageService'

import images from './reducers/images'
import searchTerm from './reducers/searchTerm'

export const store = configureStore({
  reducer: {
    searchTerm,
    images,
    [ImageAPI.reducerPath]: ImageAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ImageAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
