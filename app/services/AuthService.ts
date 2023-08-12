import { TUser } from '../store/auth-slice/auth.types'
import { defaultAxiosRequest } from './axiosDefault'
import Cookies from "js-cookie"

export interface INewTokens{
	accessToken: string
	refreshToken:string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: TUser
}

export const AuthService = {
	async signIn(email: string, password: string) {
		const user = await defaultAxiosRequest.post<IAuthResponse>('auth/signin', { email, password })
		Cookies.set("refresh-token", user.data.refreshToken, {
			expires:7
		})
		return user.data
	},
	async signUp(username: string, email: string, password: string) {
		const user = await defaultAxiosRequest.post<IAuthResponse>('auth/signup', {
			username,
			email,
			password,
		})
		Cookies.set('refresh-token', user.data.refreshToken, {
			expires: 7 
		})
		return user.data
	},
	async getNewTokens() {
		const refreshToken = Cookies.get("refresh-token")
		const tokens = await defaultAxiosRequest
			.get<INewTokens>('/auth/refresh', {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			})
			.then(({ data }) => data)
		Cookies.set("refresh-token", tokens.refreshToken, {
			expires: 7,
		})
		return tokens
	},
	async logOut(accessToken:string) {
		await defaultAxiosRequest.post('auth/logout', null, {
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		})
	}
}
