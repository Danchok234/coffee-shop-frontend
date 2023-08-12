import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitialActiveItemState } from './activeItem.types'

const initialState: IInitialActiveItemState = {
	active:0
}

export const activeItemSlice = createSlice({
	name: 'active',
	initialState,
	reducers: {
		changeActiveItem(state, action: PayloadAction<{id:number}>) {
			state.active = action.payload.id
		}
	},
})

export const {changeActiveItem} = activeItemSlice.actions