import { useActions } from '@/app/hooks/useActions'
import { FC } from 'react'
import styles from './sizes.module.scss'
import Image from 'next/image'

interface IItemSize {
	image: string
	sizeName: string
	index: number
	variant:"large"|"small"
}

const ItemSize: FC<IItemSize> = ({variant, image, sizeName, index }) => {
	const { changeSelectedSize } = useActions()

	return (
		<div className={styles.size} onClick={() => changeSelectedSize(index)}>
			<Image src={image} alt={sizeName} width={variant==="large"?28:24} height={variant === "large" ? 28:24}/>
			<span>{sizeName}</span>
		</div>
	)
}

export default ItemSize
