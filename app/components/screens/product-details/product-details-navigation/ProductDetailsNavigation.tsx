import clsx from 'clsx'
import { NextPage } from 'next'
import Link from 'next/link'
import styles from '../details.module.scss'
import { useProductNavigation } from './useProductNavigation'
import { useQuery } from 'react-query'
import { ProductService } from '@/app/services/ProductsService'


const ProductDetailsNavigation: NextPage<{ productId: number }> = ({ productId }) => {
	
	const {prevProductSlug, nextProductSlug} = useProductNavigation(productId)

	return (
		<div className={styles.navigation}>
			<Link
				href={`/product/${prevProductSlug}`}
				className={clsx(styles.left, {
					[styles.disabled]: !prevProductSlug,
				})}
			/>
			<Link
				href={`/product/${nextProductSlug}`}
				className={clsx(styles.right, {
					[styles.disabled]: !nextProductSlug,
				})}
			/>
		</div>
	)
}


export default ProductDetailsNavigation


