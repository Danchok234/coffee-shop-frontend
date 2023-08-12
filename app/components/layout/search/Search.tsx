import { useActions } from '@/app/hooks/useActions'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'
import { variantEnum } from '../Layout'
import styles from './search.module.scss'
import clsx from 'clsx'

interface ISearch {
	variant?: variantEnum
}

const Search: FC<ISearch> = ({ variant }) => {
	const { searchTerm } = useTypedSelector(state => state.persistedReducer.search)

	const [currSearchText, setCurrSearchText] = useState(searchTerm)
	const { changeSearchTerm } = useActions()

	useEffect(() => {
		changeSearchTerm({ searchTerm: '' }), setCurrSearchText('')
	}, [])

	const disabled = variant === variantEnum.WITHOUT_SEARCH

	const onClickHandler = () => {
		if (!disabled) {
			changeSearchTerm({ searchTerm: currSearchText })
		}
		console.log('disabled')
	}

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!disabled) {
			if (e.key === 'Enter') {
				onClickHandler()
			}
		}
	}

	return (
		<div className={clsx(styles.search, [{
			[styles.without]:disabled
		}])}>
			{disabled ? null : (
				<>
					<FontAwesomeIcon
						icon={faSearch}
						style={{
							color: 'grey',
							fontSize: "1rem",
							position: 'absolute',
							right: '1rem',
							opacity: 0.8,
							cursor: 'pointer',
							zIndex:20
						}}
						onClick={() => onClickHandler()}
					/>
					<input
						className={styles.input}
						onChange={e => setCurrSearchText(e.target.value)}
						value={currSearchText}
						placeholder='Search'
						onKeyDown={e => onKeyPressHandler(e)}
						disabled={disabled}
					/>
				</>
			)}
		</div>
	)
}

export default Search
