import { Rubik } from 'next/font/google'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import Cart from './cart/Cart'
import styles from './layout.module.scss'
import Menu from './menu/Menu'
import Meta from './meta/Meta'
import Search from './search/Search'

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
	style: ['italic', 'normal'],
})

export enum variantEnum {
	WITH_SEARCH = 'withSearch',
	WITHOUT_SEARCH = 'withoutSearch',
}

interface ILayout {
	title: string
	description?: string
	variant: variantEnum
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, title, description, variant }) => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleWindowResize)
	}, [])

	return (
		<>
			<Meta title={title} description={description} />
			<header className={styles.header} style={rubik.style}>
				{width > 1024 ? (
					<>
						<Menu width={width} />
						<Search variant={variant} />
						<Cart width={width} />
					</>
				) : (
					<>
						<div>
							<div>
								<Menu width={width} />
								<Cart width={width} />
							</div>
							<Search variant={variant} />
						</div>
					</>
				)}
			</header>
			<div className={styles.wrapper}>
				<main className={styles.content}>{children}</main>
			</div>
		</>
	)
}

export default Layout
