import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './auth.module.scss'
import { AuthEnum, AuthType } from './types'
import { useActions } from '@/app/hooks/useActions'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { useQuery } from 'react-query'
import { AuthService } from '@/app/services/AuthService'

interface IAuthForm {
	setIsFormOpen: Dispatch<SetStateAction<boolean>>
	formType: AuthType
	setFormType: Dispatch<SetStateAction<AuthType>>
}

const AuthForm: FC<IAuthForm> = ({ setIsFormOpen, formType, setFormType }) => {
	const { logOut, setCredentials } = useActions()

	const auth = useTypedSelector(state=>state.persistedReducer.auth)

	useEffect(() => {
	}, [])

	return (
		<div className={styles['form-box']}>
			<div onClick={() => setIsFormOpen(false)} className={styles.back}></div>
			<h2>{formType === AuthEnum.SIGN_UP ? 'Sign Up' : 'Sign In'}</h2>

			{formType === AuthEnum.SIGN_UP ? (
				<SignUp setIsFormOpen={setIsFormOpen} setFormType={setFormType} />
			) : (
				<SignIn setIsFormOpen={setIsFormOpen} setFormType={setFormType} />
			)}
		</div>
	)
}

export default AuthForm
