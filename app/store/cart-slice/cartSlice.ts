import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IAddToCartPayload,
	IChangeQuantityPayload,
	IInitialCartState,
} from './cartSlice.types'

const initialState: IInitialCartState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<IAddToCartPayload>) {
			const item = state.items.find(
				cartItem =>
					cartItem.product.id === action.payload.product.id &&
					cartItem.size === action.payload.size
			)
			if (!item)
				state.items.push({
					...action.payload,
					quantity: 1,
					id: state.items.length,
					size: action.payload.size,
				})
		},
		removeFromCart(state, action: PayloadAction<{ id: number }>) {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		changeQuantity(state, action: PayloadAction<IChangeQuantityPayload>) {
			const currItem = state.items.find(item => item.id === action.payload.id)
			if (currItem) {
				if (action.payload.type === 'plus' && currItem.quantity < 99)
					currItem.quantity++
				else if (action.payload.type === 'minus') currItem.quantity--
			}
		},
	},
})

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions
