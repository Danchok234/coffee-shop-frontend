import { FC } from 'react'
import styles from "./button.module.scss"
import clsx from 'clsx'
import { useActions } from '@/app/hooks/useActions'
import { IProduct } from '@/app/types/products.interface'
import { Sizes } from '@/app/types/cart.interface'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'

interface IItemButton{
	isActive: boolean,
	product: IProduct,
	variant?:"large"|"small"
}


const ItemButton: FC<IItemButton> = ({variant, isActive, product }) => {

	const {selectedSize } = useTypedSelector(state=> state.persistedReducer.selectedSize)

	const {addToCart } = useActions()

	return (
		<button onClick={() => addToCart({ product: product, size: Sizes[selectedSize] })} className={clsx(styles.button, {
			[styles.active]: isActive,
			[styles.large]:variant === "large"
		})}>
			<span>Add to Basket</span>
		</button>
	)
}

export default ItemButton