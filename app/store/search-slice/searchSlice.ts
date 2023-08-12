import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitialSearchState } from './searchSlice.types'

const initialState: IInitialSearchState = {
	searchTerm:""
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeSearchTerm(state, action: PayloadAction<{ searchTerm:string }>) {
			state.searchTerm = action.payload.searchTerm
		},
	},
})

export const { changeSearchTerm } = searchSlice.actions
