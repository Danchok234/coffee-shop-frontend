import { ICartItem } from '@/app/types/cart.interface'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import styles from '../cart.module.scss'
import { useActions } from '@/app/hooks/useActions'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {

	const { changeQuantity, removeFromCart } = useActions();
	
	const handleMinusQuantity = () => {
		if (item.quantity > 1) changeQuantity({ type: "minus", id: item.id })
		else removeFromCart({id:item.id})
	}

	return (
		<div className={styles['cart-item']}>
			<Image
				src={item.product.images[0]}
				alt={item.product.name}
				width={100}
				height={100}
				loading='lazy'
			/>
			<h4>{item.product.name}<span>{ item.size}</span>
			</h4>
			
			<h5>
				<span className={styles['cart-item__price']}>
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						notation: 'compact',
					}).format(item.product.price*item.quantity)}
				</span>
			</h5>

			<div className={styles['quantity-block']}>
				<h4>Quantity:</h4>
				<div className={ styles["actions-block"]}>
					<button onClick={() => handleMinusQuantity()}>-</button>
					<h5>{item.quantity}</h5>
					<button onClick={() => changeQuantity({type:"plus", id:item.id})}>+</button>
				</div>
			</div>
			<div className={styles.divider}></div>
		</div>
	)
}

export default CartItem
