import { defaultAxiosRequest } from './axiosDefault'

export const UsersService = {
	async findUserByEmail(email: string) {
		return defaultAxiosRequest.get<IUser|undefined>("users", {
			data: [
				{
					email
				}
			]
		})
	},
}
