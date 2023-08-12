import { ChevronDownIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import styles from './auth.module.scss'
import { useActions } from '@/app/hooks/useActions'
import { useMutation } from 'react-query'
import { AuthService } from '@/app/services/AuthService'
import { AxiosError } from 'axios'
import { TUser } from '@/app/store/auth-slice/auth.types'

interface ILoggedIn {
	user: TUser
}

const LoggedIn: FC<ILoggedIn> = ({ user }) => {
	const [clicked, setClicked] = useState(false)

	const { logOut, setCredentials } = useActions()

	const { mutateAsync: logoutAsync } = useMutation('logOut', (accessToken:string) => AuthService.logOut(accessToken))

	const handleLogOut = async () => {
		try {
			const { accessToken } = await AuthService.getNewTokens()
			setCredentials({ user, token: accessToken })
			await logoutAsync(accessToken)
			logOut()
		} catch (e) {
			if (e instanceof AxiosError) {
				alert(e.response?.data.message)
			}
			logOut()
		}
	}
	
	return (
		<div onClick={() => setClicked(!clicked)} className={styles['logged-in']}>
			<div className={styles.username}>
				<h3>{user.username}</h3>
				<Icon
					className={clsx(styles.icon, {
						[styles.clicked]: clicked,
					})}
					as={ChevronDownIcon}
				/>
			</div>
			<div onClick={()=>handleLogOut()} className={clsx(styles['log-out'], {
				[styles.clicked]:clicked
			})}>
				<h3>Log Out</h3>
				<FiLogOut />
			</div>
		</div>
	)
}

export default LoggedIn
