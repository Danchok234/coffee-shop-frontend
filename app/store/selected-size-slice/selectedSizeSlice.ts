import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitialSelectedSizeState } from './selectedSize.types'

const initialState: IInitialSelectedSizeState = {
	selectedSize: 0
}

export const selectedSizeSlice = createSlice({
	name: 'selectedSize',
	initialState,
	reducers: {
		changeSelectedSize(state, action: PayloadAction<number>) {
			state.selectedSize = action.payload
		},
	},
})

export const { changeSelectedSize } = selectedSizeSlice.actions
