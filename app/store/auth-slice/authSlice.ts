import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitialAuthState, IPayload } from './auth.types'

const initialState: IInitialAuthState = {
	user: null,
	token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials(state, action: PayloadAction<IPayload>) {
			state.token = action.payload.token
			state.user = action.payload.user
		},
		logOut: state => {
			state.token = null
			state.user = null
		},
	},
})

export const { setCredentials, logOut } = authSlice.actions
