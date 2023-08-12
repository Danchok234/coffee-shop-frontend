import { useActions } from '@/app/hooks/useActions'
import { AuthService } from '@/app/services/AuthService'
import { WarningIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import styles from './auth.module.scss'
import { AuthEnum, AuthType } from './types'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface ISignIn {
	setFormType: Dispatch<SetStateAction<AuthType>>
	setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

interface ISignInData {
	Email: string
	Password: string
}

const SignIn: FC<ISignIn> = ({ setFormType, setIsFormOpen }) => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const { setCredentials } = useActions()
	const [showPassword, setShowPassword] = useState(false)
	
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ISignInData>({
		mode: 'onChange',
		defaultValues: {
			Email: '',
			Password: '',
		},
	})

	const { mutateAsync: signInAsync } = useMutation(
		'signIn',
		({ Email, Password }: ISignInData) => AuthService.signIn(Email, Password),
		{
			onError: err => {
				if (err instanceof AxiosError) {
					setErrorMsg(err.response?.data.message)
					console.error(err.response?.data.message)
				} else setErrorMsg('Error happened on the server, try again')
			},
			onSuccess: data => {
				setCredentials({ token: data.accessToken, user: data.user })
				setIsFormOpen(false)
			},
		}
	)

	const onSubmit = async (formInfo: ISignInData) => {
		signInAsync(formInfo)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles['form-body']}>
				<div className={styles.block}>
					<input
						className={errors.Email ? styles.incorrect : styles.correct}
						placeholder='Email'
						{...register('Email', {
							required: 'This field is required!',
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
								message: 'Incorrect email!',
							},
						})}
					/>
					{errors?.Email && (
						<div className={styles['error-block']}>
							<Icon className={styles['error-icon']} as={WarningIcon} />
							<p className={styles.error}>{errors.Email.message}</p>
						</div>
					)}
				</div>
				<div className={styles.block}>
					<div className={styles['password-input']}>
						<input
							className={errors.Password ? styles.incorrect : styles.correct}
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							{...register('Password', {
								required: 'This field is required!',
								minLength: {
									value: 8,
									message: 'This field must have more than 8 symbols',
								},
							})}
						/>
						<Icon
							className={styles['eye-icon']}
							as={showPassword ? AiFillEye : AiFillEyeInvisible}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</div>
					{errors?.Password && (
						<div className={styles['error-block']}>
							<Icon className={styles['error-icon']} as={WarningIcon} />
							<p className={styles.error}>{errors.Password.message}</p>
						</div>
					)}
				</div>
				{errorMsg ? (
					<div className={styles['error-block']} style={{ paddingLeft: 30 }}>
						<Icon className={styles['error-icon']} as={WarningIcon} />
						<p className={styles.error}>{errorMsg}</p>
					</div>
				) : null}
				<p className={styles['info-text']}>
					If you don`t have an account you can{' '}
					<a onClick={() => setFormType(AuthEnum.SIGN_UP)}>sign up</a>
				</p>
			</div>
			<button className={styles['submit-button']} type='submit' disabled={!isValid}>
				Sign In
			</button>
		</form>
	)
}

export default SignIn
