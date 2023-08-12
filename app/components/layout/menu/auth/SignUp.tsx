import { AuthService } from '@/app/services/AuthService'
import { WarningIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useMutation } from 'react-query'
import styles from './auth.module.scss'
import { AuthEnum, AuthType } from './types'
import { useActions } from '@/app/hooks/useActions'

interface ISignUp {
	setFormType: Dispatch<SetStateAction<AuthType>>
	setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

interface ISignUpData {
	Username: string
	Email: string
	Password: string
}

const SignUp: FC<ISignUp> = ({ setFormType, setIsFormOpen }) => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [showPassword, setShowPassword] = useState(false)

	const {setCredentials } = useActions()

	const {
		handleSubmit,
		formState: { errors, isValid },
		register,
	} = useForm<ISignUpData>({
		mode: 'onChange',
		defaultValues: {
			Username: '',
			Email: '',
			Password: '',
		},
	})

	const { mutateAsync: signUpAsync } = useMutation(
		'signUp',
		({ Username, Email, Password }: ISignUpData) => AuthService.signUp(Username, Email, Password),
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

	const onSubmit = (formInfo: ISignUpData) => {
		signUpAsync(formInfo)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles['form-body']}>
				<div className={styles.block}>
					<input
						className={errors.Username ? styles.incorrect : styles.correct}
						placeholder='Username'
						{...register('Username', {
							required: 'This field is required!',
							minLength: {
								value: 6,
								message: 'This field must have more than 6 symbols',
							},
							maxLength: {
								value: 20,
								message: 'This field must have less than 20 symbols',
							},
							pattern: {
								value: /[A-Za-z][A-Za-z0-9_]{5,20}$/,
								message: 'Your email have to start with alphabet letter',
							},
						})}
					/>
					{errors?.Username && (
						<div className={styles['error-block']}>
							<Icon className={styles['error-icon']} as={WarningIcon} />
							<p className={styles.error}>{errors.Username.message}</p>
						</div>
					)}
				</div>
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
							type={showPassword ? 'text' : 'password'}
							className={errors.Password ? styles.incorrect : styles.correct}
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
					If you already have an account you can{' '}
					<a onClick={() => setFormType(AuthEnum.SIGN_IN)}>sign in</a>
				</p>
			</div>
			<button className={styles['submit-button']} type='submit' disabled={!isValid}>
				Sign Up
			</button>
		</form>
	)
}

export default SignUp
