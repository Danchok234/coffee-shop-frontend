import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { activeItemSlice } from './active-item-slice/activeItemSlice'
import { authSlice } from './auth-slice/authSlice'
import { cartSlice } from './cart-slice/cartSlice'
import { searchSlice } from './search-slice/searchSlice'
import { selectedSizeSlice } from './selected-size-slice/selectedSizeSlice'

const RootReducer = combineReducers({
	cart: cartSlice.reducer,
	activeItem: activeItemSlice.reducer,
	selectedSize: selectedSizeSlice.reducer,
	search: searchSlice.reducer,
	auth: authSlice.reducer,
})

const persistConfig = {
	key: 'coffee-shop',
	storage,
	whitelist: ['cart', 'activeItem', 'selectedSize', 'search', 'auth'],
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
	reducer: {
		persistedReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)

export type RootStateType = ReturnType<typeof store.getState>
