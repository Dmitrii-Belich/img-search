import {Image} from './index'

export enum imageActions {
  IMAGES_LOADING = 'IMAGES_LOADING',
  IMAGES_SEARCH_FETCH = 'IMAGES_SEARCH_FETCH',
  FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR',
  CLEAR_IMAGES = 'CLEAR_IMAGES'
}

interface FetchImagesAction {
  type: typeof imageActions.IMAGES_SEARCH_FETCH
  payload: {
    photos: {
      page: number
      pages: number
      photo: Image[]
    }
    term: string
  }
}

export interface FetchImagesNoPayloadAction {
  type: typeof imageActions.IMAGES_LOADING | typeof imageActions.CLEAR_IMAGES
}

interface FetchImagesErrorAction {
  type: typeof imageActions.FETCH_IMAGES_ERROR
  error: string
}

export type ImageAction = FetchImagesAction | FetchImagesNoPayloadAction | FetchImagesErrorAction
