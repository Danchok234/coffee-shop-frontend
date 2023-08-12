export type TUser = {
	id: number,
	email: string,
	username:string
}

export interface IInitialAuthState {
	user: TUser | null
	token: string | null
}

export interface IPayload {
	user: TUser|null,
	token:string|null
}