import { TUser } from '../store/auth-slice/auth.types'
import { defaultAxiosRequest } from './axiosDefault'

export interface IReview {
	user: TUser
	reviewText: string
	rating: number
	productId: number
}

export interface IGetReviewsByProductId{
	reviews:IReview[]
}

export const ReviewService = {
	async createReview(
		productId: number,
		rating: number | null,
		accessToken: string,
		reviewText?: string
	) {
		return defaultAxiosRequest.post(
			'/review/create',
			{ productId, rating, reviewText },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
	},
	async GetReviewsByProductId(productId: number) {
		return defaultAxiosRequest
			.get<IGetReviewsByProductId>(`/review/${productId}`)
			.then(({ data }) => data)
	},
}
