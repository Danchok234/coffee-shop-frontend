import ItemButton from '@/app/components/ui/reusable/item-button/ItemButton'
import ItemSizes from '@/app/components/ui/reusable/item-sizes/ItemSizes'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { IProductDetails } from '@/src/pages/product/[slug]'
import { FC, useEffect, useState } from 'react'
import styles from '../card.module.scss'
import ProductRating from './product-reviews/ProductRating'
import ProductReviewsPopUp from './product-reviews/ProductReviewsPopUp'
import { IGetReviewsByProductId, ReviewService } from '@/app/services/ReviewService'
import { useQuery } from 'react-query'

export enum PopUpVariantEnum {
	'CREATE_REVIEW' = 'create',
	'VIEW_REVIEWS' = 'view',
}

const ProductConfigurations: FC<IProductDetails> = ({ product }) => {
	const [isPopUpOpen, setIsPopUpOpen] = useState(false)
	const [popUpVariant, setPopUpVariant] = useState<PopUpVariantEnum>(PopUpVariantEnum.VIEW_REVIEWS)

	const { data } = useQuery<IGetReviewsByProductId>({
		queryKey: ['getReviewsByProductId',product,isPopUpOpen],
		queryFn: () => ReviewService.GetReviewsByProductId(product.id),
	})

	const user = useTypedSelector(state => state.persistedReducer.auth.user)

	useEffect(() => {
		isPopUpOpen
			? (document.body.style.overflowY = 'hidden')
			: (document.body.style.overflowY = 'auto')
	}, [isPopUpOpen])

	return (
		<div className={styles.configurations}>
			<ProductRating
				data={data}
				user={user}
				product={product}
				setPopUpVariant={setPopUpVariant}
				setIsPopUpOpen={setIsPopUpOpen}
			/>
			{isPopUpOpen ? (
				<ProductReviewsPopUp
					product={product}
					user={user}
					variant={popUpVariant}
					setIsPopUpOpen={setIsPopUpOpen}
					data={ data }
				/>
			) : null}
			<div className={styles.actions}>
				<ItemSizes variant={'large'} />
				<ItemButton variant={'large'} product={product} isActive={true} />
			</div>
		</div>
	)
}

export default ProductConfigurations
