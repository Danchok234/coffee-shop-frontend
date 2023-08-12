import { ICartItem } from '@/app/types/cart.interface'

export interface IInitialCartState {
	items: ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'|"quantity"> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, "id"> {
	type: 'plus' | 'minus'
}
