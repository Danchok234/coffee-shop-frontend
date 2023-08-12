import { IProduct } from './products.interface'

export type SizesType = 'SMALL' | 'MEDIUM' | 'GRANDE'

export const Sizes: SizesType[] = [
	"SMALL",
	"MEDIUM",
	"GRANDE"
]

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number,
	size:SizesType
}
