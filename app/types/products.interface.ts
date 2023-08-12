export interface IProduct{
	id:number
	name: string,
	slug:string,
	images: string[],
	description: string,
	price: number,
	reviews:IReview[]
}

export interface IReview{
	id: number
	rating: number,
	reviewText:string
}

export enum SortingEnum {
	NEWEST = 'newest',
	OLDEST = 'oldest',
	LOW_TO_HIGH = 'low-to-high',
	HIGH_TO_LOW = 'high-to-low',
}

export const sortMenu = [
	{
		name: 'Newest',
		sortType: SortingEnum.NEWEST,
	},
	{
		name: 'Oldest',
		sortType: SortingEnum.OLDEST,
	},
	{
		name: 'Price(high-to-low)',
		sortType: SortingEnum.HIGH_TO_LOW,
	},
	{
		name: 'Price(low-to-high)',
		sortType: SortingEnum.LOW_TO_HIGH,
	},
]

export type SortType = 'newest' | 'oldest' | 'high-to-low' | 'low-to-high'