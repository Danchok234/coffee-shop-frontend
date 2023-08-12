import { IProduct, SortType } from '../types/products.interface'
import { defaultAxiosRequest } from './axiosDefault'

export const ProductService = {
	async getAllProducts() {
		return defaultAxiosRequest.get<IProduct[] | IProduct>(`/products`).then(({ data }) => data)
	},
	async getAllProductsWithSortingAndSearching(sortType?: SortType, searchTerm?: string) {
		return defaultAxiosRequest
			.get<IProduct[] | IProduct | null>(`/products`, {
				params: {
					sortType: sortType,
					searchTerm: searchTerm,
				},
			})
			.then(({ data }) => data)
	},

	async getProductBySlug(slug?: string | string[]) {
		return defaultAxiosRequest.get(`/products/slug/${slug}`).then(({ data }) => data)
	},
	async getProductById(id?: number) {
		return defaultAxiosRequest.get(`/products/${id}`).then(({ data }) => data)
	},
	async getProductsBySearchTerm(searchTerm: string) {
		return defaultAxiosRequest
			.get<IProduct[]>(`/products`, {
				params: {
					searchTerm,
				},
			})
			.then(({ data }) => data)
	},
}
