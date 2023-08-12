import { Dispatch, FC, SetStateAction } from 'react'
import styles from "./card.module.scss"
import Image from 'next/image'
import { IProduct } from '@/app/types/products.interface'
import clsx from 'clsx'

interface IProductInfo{
	setActiveImageIndex: Dispatch<SetStateAction<number>>,
	activeImageIndex: number,
	product:IProduct
}

const ProductInfo: FC<IProductInfo> = ({ product, setActiveImageIndex, activeImageIndex}) => {
	return (
		<div className={styles.info}>
			<div className={ styles.description }>
				{ product.description}
			</div>
			<div className={ styles.images}>
			{
					product.images.map((image, index )=> {
						return <Image className={clsx(styles["image-variant"], {
							[styles.active]:activeImageIndex === index
						}) } alt={product.name } key={image} width={100} height={100} src={image} onClick={()=> setActiveImageIndex(index)}/>
				})
				}
				</div>
		</div>
	)
}

export default ProductInfo