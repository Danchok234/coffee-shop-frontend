import { TUser } from '@/app/store/auth-slice/auth.types'
import { IProduct } from '@/app/types/products.interface'
import { Rating } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styles from '../../card.module.scss'
import { PopUpVariantEnum } from '../ProductConfigurations'
import { IGetReviewsByProductId } from '@/app/services/ReviewService'

interface IProductRating {
	product: IProduct
	setIsPopUpOpen: Dispatch<SetStateAction<boolean>>
	setPopUpVariant: Dispatch<SetStateAction<PopUpVariantEnum>>
	user: TUser | null
	data: IGetReviewsByProductId|undefined
}

const theme = createTheme()
const ProductRating: FC<IProductRating> = ({
	product,
	setIsPopUpOpen,
	setPopUpVariant,
	user,
	data
}) => {

	const [rating, setRating] = useState<number>(0)
	
	useEffect(() => {
		if (data) {
			setRating(data.reviews.reduce((acc, review) => {
				return acc+review.rating
			},0)/data.reviews.length)
		} else {
			setRating(2)
		}
		
	},[data])

	const handleOnClick = (variant: PopUpVariantEnum) => {
		setIsPopUpOpen(true)
		setPopUpVariant(variant)
	}

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.rating}>
				<h6 className={styles['rating-label']}>Rating</h6>
				<div className={styles.reviews}>
					<Rating
						readOnly
						className={styles.stars}
						size={'large'}
						name='half-rating'
						value={rating}
					/>
					<div className={styles["actions-block"]}>
						<button onClick={() => handleOnClick(PopUpVariantEnum.VIEW_REVIEWS)}>
							<h6>View Reviews</h6>
						</button>
						<button
							className={user ? undefined : styles['disabled-button']}
							disabled={user ? false : true}
							onClick={() => handleOnClick(PopUpVariantEnum.CREATE_REVIEW)}
						>
							<h6>Create Review</h6>
						</button>
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default ProductRating
