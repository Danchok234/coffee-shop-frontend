import { IProductDetails } from '@/src/pages/product/[slug]'
import { FC } from 'react'
import Layout, { variantEnum } from '../../layout/Layout'
import Heading from '../../ui/heading/Heading'
import Breadcrumbs from './Breadcrumbs'
import styles from './details.module.scss'
import ProductCard from './product-card/ProductCard'
import ProductDetailsNavigation from './product-details-navigation/ProductDetailsNavigation'

const ProductDetails: FC<IProductDetails> = ({ product }) => {
	return (
		<Layout variant={variantEnum.WITHOUT_SEARCH} title={product.name} description={product.description}>
			<Heading text={product.name} />
			<Breadcrumbs productName={product.name} />
			<ProductDetailsNavigation productId={product.id} />
			<div className={styles.content}>
				<ProductCard product={product} />
			</div>
		</Layout>
	)
}

export default ProductDetails
