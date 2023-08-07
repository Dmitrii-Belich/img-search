import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {Image, ImagesResponse} from '../types/images'

const api_key = '2fffc389367d2feb91ee834c817367db'


export const ImageAPI = createApi({
  reducerPath: 'imageAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flickr.com'
  }),
  endpoints: (build) => ({
    fetchImages: build.query<{ images: Image[], currentPage: number, totalPages: number }, {
      text: string,
      page?: number
    }>({
      query: ({text = '', page = 1}) => {
        if (!text) {
          throw new Error('Text parameter is empty')
        }
        return {
          url: '/services/rest',
          params: {
            api_key,
            method: 'flickr.photos.search',
            extras: 'date_upload,url_m,url_o',
            format: 'json',
            nojsoncallback: 1,
            per_page: 50,
            text,
            page
          }
        }
      },
      transformResponse: (rawResult: ImagesResponse, meta) => {
        if (meta?.response?.status === 200 && rawResult?.stat === 'ok') {
          return {
            images: rawResult.photos.photo,
            currentPage: rawResult.photos.page,
            totalPages: rawResult.photos.pages
          }
        } else {
          throw Error(rawResult.message || meta?.response?.statusText)
        }
      }
    })
  })
})
