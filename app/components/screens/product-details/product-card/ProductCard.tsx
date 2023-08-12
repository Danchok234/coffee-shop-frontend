import { IProductDetails } from '@/src/pages/product/[slug]'
import { FC, useState } from 'react'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'
import styles from './card.module.scss'
import ProductConfigurations from './product-configurations/ProductConfigurations'

const ProductCard: FC<IProductDetails> = ({ product }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0)
	return (
		<div className={styles.card}>
			<div className={styles['bg-pattern']}></div>
			<ProductInfo
				activeImageIndex={activeImageIndex}
				setActiveImageIndex={setActiveImageIndex}
				product={product}
			/>
			<ProductImage
				activeImageIndex={activeImageIndex}
				product={product}
			/>
			<ProductConfigurations product={ product} />
		</div>
	)
}

export default ProductCard
