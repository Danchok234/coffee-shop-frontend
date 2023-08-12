import clsx from 'clsx'
import { FC } from 'react'
import styles from './sizes.module.scss'
import ItemSize from './ItemSize'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { SizeImages } from '@/app/data/size-images.data'

const ItemSizes: FC<{variant:"large"|"small"}> = ({variant }) => {

	const {selectedSize } = useTypedSelector(state=>state.persistedReducer.selectedSize)

	return (
		<div
			className={clsx(styles['sizes-block'], {
				[styles.firstSelected]: selectedSize === 0,
				[styles.secondSelected]: selectedSize === 1,
				[styles.thirdSelected]: selectedSize === 2,
				[styles.large]: variant === "large"
			})}
		>
			{Object.entries(SizeImages).map((item, index) => {
				return (
					<ItemSize
						key={item[0]}
						index={index}
						image={item[1]}
						sizeName={item[0]}
						variant={variant }
					/>
				)
			})}
		</div>
	)
}

export default ItemSizes
