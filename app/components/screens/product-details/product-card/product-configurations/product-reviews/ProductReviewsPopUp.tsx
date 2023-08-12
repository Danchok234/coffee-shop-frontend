import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'

import { AuthService } from '@/app/services/AuthService'
import { IGetReviewsByProductId, ReviewService } from '@/app/services/ReviewService'
import { TUser } from '@/app/store/auth-slice/auth.types'
import { IProduct } from '@/app/types/products.interface'
import { Rating, ThemeProvider, createTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import styles from '../../card.module.scss'
import { PopUpVariantEnum } from '../ProductConfigurations'

interface IProductReviewsPopUp {
	setIsPopUpOpen: Dispatch<SetStateAction<boolean>>
	product: IProduct
	variant: PopUpVariantEnum
	user: TUser | null
	data: IGetReviewsByProductId|undefined
}

const theme = createTheme()

const ProductReviewsPopUp: FC<IProductReviewsPopUp> = ({
	setIsPopUpOpen,
	product,
	variant,
	user,
	data
}) => {
	const [ratingValue, setRatingValue] = useState<number>(3)

	const [charCounter, setCharCounter] = useState<number>(200)

	const TextareaRef = useRef<HTMLTextAreaElement>(null)

	const { handleSubmit } = useForm()

	const onChangeTextarea = () => {
		setCharCounter(200 - TextareaRef!.current!.value.length)
	}

	const { mutateAsync: createReviewAsync } = useMutation({
		mutationKey: 'createReview',
		mutationFn: (accessToken: string) =>
			ReviewService.createReview(product.id, ratingValue, accessToken, TextareaRef.current?.value),
	})

	const onSubmit = async () => {
		const tokens = await AuthService.getNewTokens()
		await createReviewAsync(tokens.accessToken)
		setIsPopUpOpen(false)
	}

	return (
		<ThemeProvider theme={theme}>
			<div className={styles['pop-up']}>
				<div onClick={() => setIsPopUpOpen(false)} className={styles.back} />
				{variant === PopUpVariantEnum.VIEW_REVIEWS ? (
					<>
						<h2>Reviews</h2>
						<div className={styles['list-body']}>
							{data?.reviews.length !== 0 ? (
								<ul className={styles.list}>
									{data?.reviews.map((review, index) => {
										return (
											<li className={styles['pop-up__item']} key={index}>
												<h3 className={styles.username}>{review.user.username}</h3>
												<Rating
													readOnly
													className={styles.stars}
													size={'medium'}
													name='half-rating'
													value={review.rating}
												/>
												<p>{review.reviewText}</p>
											</li>
										)
									})}
								</ul>
							) : (
								<h1>No reviews yet</h1>
							)}
						</div>
					</>
				) : (
					<>
						<h2>Create</h2>
						<div className={styles['list-body']}>
							<h3>
								Username : <span>{user!.username}</span>
							</h3>
							<form
								onSubmit={handleSubmit(onSubmit)}
								id='create-review-form'
								className={styles['review-form']}
							>
								<div className={styles.textarea}>
									<h3>Review:</h3>
									<textarea
										rows={4}
										cols={50}
										maxLength={200}
										placeholder='Your review ...'
										ref={TextareaRef}
										onChange={() => onChangeTextarea()}
									/>
									<h4>
										Symbols left: <span> {charCounter}</span>
									</h4>
								</div>
								<div className={styles['rating-div']}>
									<h3>Rating:</h3>
									<Rating
										className={styles.stars}
										size={'large'}
										defaultValue={3}
										value={ratingValue}
										onChange={(event, newValue) => {
											setRatingValue(newValue !== null ? newValue : 0)
										}}
									/>
								</div>
							</form>
						</div>
						<button form='create-review-form' className={styles['submit-button']} type='submit'>
							Create Review
						</button>
					</>
				)}
			</div>
		</ThemeProvider>
	)
}

export default ProductReviewsPopUp
