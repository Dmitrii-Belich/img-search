import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      return action.payload
    }
  }
})

export default searchTermSlice.reducer
