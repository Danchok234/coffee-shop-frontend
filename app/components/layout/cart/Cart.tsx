import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import {BsCartFill} from "react-icons/bs"
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	useDisclosure,
} from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import CartItem from './cart-item/CartItem'
import styles from './cart.module.scss'
import { ConvertToPrice } from '@/app/utils/ConvertToPrice'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Cart: FC<{width:number}> = ({width}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef(null)

	const cartItems = useTypedSelector(state => state.persistedReducer.cart.items)

	const fullPrice = cartItems.reduce((acc, item) => {
		return acc + item.quantity * item.product.price
	}, 0)

	return (
		<div className={styles.cart}>
			<div className={styles.badge}>
				<span>{cartItems.length}</span>
			</div>
			<button ref={btnRef} onClick={onOpen}>
				{width > 767 ? <>MY BASKET</> : <Icon className={ styles["cart-icon"]} as={BsCartFill}></Icon>}
			</button>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Basket</DrawerHeader>

					<DrawerBody className={styles.body}>
						{cartItems.length ? (
							cartItems.map(product => {
								return <CartItem key={product.id} item={product} />
							})
						) : (
							<h1 className={styles['no-items-h1']}>You don`t have any items in your cart :(</h1>
						)}
					</DrawerBody>

					<DrawerFooter
						style={{ justifyContent: 'space-between' }}
						className={styles['cart-footer']}
					>
						<div className={styles.total}>
							<h5>Total Price:</h5>
							<span>{ConvertToPrice(fullPrice)}</span>
						</div>
						<Button colorScheme='green'>Check Out</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default Cart
