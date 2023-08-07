export interface Image {
  id: string
  title: string
  farm: string
  server: string
  secret: string
  dateupload: string
  url_m: string
  url_o: string
}

export interface ImagesState {
  text: string
  images: Image[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
}

export interface ImagesResponse {
  photos: {
    photo: Image[]
    page: number
    pages: number
  }
  stat: string
  message?: string
}
