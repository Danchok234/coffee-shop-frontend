import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { FC, useEffect, useState } from 'react'
import AuthForm from './auth/AuthForm'
import LoggedIn from './auth/LoggedIn'
import { AuthEnum, AuthType } from './auth/types'
import Logo from './logo/Logo'
import styles from './menu.module.scss'

const Menu: FC<{ width: number }> = ({ width }) => {
	const [isFormOpen, setIsFormOpen] = useState(false)

	const user = useTypedSelector(state => state.persistedReducer.auth.user)

	const [formType, setFormType] = useState<AuthType>(AuthEnum.SIGN_UP)

	const handleClick = (type: AuthType) => {
		window.scrollTo(0, 0)
		setIsFormOpen(true)
		setFormType(type)
	}

	useEffect(() => {
		isFormOpen
			? (document.body.style.overflowY = 'hidden')
			: (document.body.style.overflowY = 'auto')
	}, [isFormOpen])

	return (
		<div className={styles.menu}>
			<Logo />
			{user ? (
				<LoggedIn user={user} />
			) : (
				<>
					{width > 576 ? (
						<>
							<button onClick={() => handleClick(AuthEnum.SIGN_UP)}>Sign Up</button>
							<button onClick={() => handleClick(AuthEnum.SIGN_IN)}>Sign In</button>
						</>
					) : (
						<button onClick={() => handleClick(AuthEnum.SIGN_IN)}>Sign In</button>
					)}

					{isFormOpen ? (
						<AuthForm formType={formType} setFormType={setFormType} setIsFormOpen={setIsFormOpen} />
					) : null}
				</>
			)}
		</div>
	)
}

export default Menu
