import { FC } from 'react'
import styles from './heading.module.scss'

interface IHeading {
	text:string
}

const Heading: FC<IHeading> = ({ text }) => {

	return (
		<div className={styles.heading}>
			<h1>{text}</h1>
		</div>
	)
}

export default Heading
