import { useActions } from '@/app/hooks/useActions'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { IProduct } from '@/app/types/products.interface'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import 'swiper/css'
import ItemButton from '../../../reusable/item-button/ItemButton'
import ItemSizes from '../../../reusable/item-sizes/ItemSizes'
import styles from '../carousel.module.scss'

interface ICarouselItem {
	product: IProduct 
	selfIndex: number
}

const CarouselItem: FC<ICarouselItem> = ({ product, selfIndex }) => {
	const { changeActiveItem } = useActions()
	const { active } = useTypedSelector(state => state.persistedReducer.activeItem)
	const isActive = active === selfIndex

	return (
		<div
			className={clsx(styles.item, {
				[styles.active]: isActive,
			})}
			onClick={() => changeActiveItem({ id: selfIndex })}
		>
			<div className={styles['bg-image']} />

			<Image
				className={styles.image}
				alt={product.name}
				src={product.images[0]}
				width={200}
				height={200}
			/>

			<div className={styles.name}>
				{product.name.length > 28 ? product.name.slice(0, 28) + '...' : product.name}
			</div>

			{isActive ? (
				<>
					<ItemSizes variant={'small'} />

					<ItemButton isActive={isActive} product={product} />

					<Link href={`/product/${product.slug}`} className={styles.more}>
						More about this product
					</Link>
				</>
			) : (
				<div className={styles.description}>
					<p>{product.description.length > 70 ? product.description.slice(0, 70) + '...' : product.description}</p>
				</div>
			)}
		</div>
	)
}

export default CarouselItem
