import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from "../menu.module.scss"

const Logo: FC = () => {
	return (
		<Link className={styles.logo} href={'/'}>
			<Image src={'/coffee-cup.png'} alt={'Coffee Shop'} width={60} height={60} loading='lazy' />
		</Link>
	)
}

export default Logo