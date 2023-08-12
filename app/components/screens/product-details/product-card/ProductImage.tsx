import { IProduct } from '@/app/types/products.interface'
import { ConvertToPrice } from '@/app/utils/ConvertToPrice'
import Image from 'next/image'
import { FC } from 'react'
import styles from './card.module.scss'

interface IProductImage {
	activeImageIndex: number
	product: IProduct
}

const ProductImage: FC<IProductImage> = ({ product, activeImageIndex }) => {
	return (
		<div className={ styles["image-box"]}>
			<div className={styles.image}>
				<Image
					src={product.images[activeImageIndex]}
					alt={product.name}
					width={700}
					height={700}
				/>
			</div>
			<h3 className={styles.price}>{ConvertToPrice(product.price)}</h3>
		</div>
	)
}

export default ProductImage
