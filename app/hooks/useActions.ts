import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { activeItemSlice } from '../store/active-item-slice/activeItemSlice'
import { authSlice } from '../store/auth-slice/authSlice'
import { cartSlice } from '../store/cart-slice/cartSlice'
import { searchSlice } from '../store/search-slice/searchSlice'
import { selectedSizeSlice } from '../store/selected-size-slice/selectedSizeSlice'

const rootActions = {
	...cartSlice.actions,
	...activeItemSlice.actions,
	...selectedSizeSlice.actions,
	...searchSlice.actions,
	...authSlice.actions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
