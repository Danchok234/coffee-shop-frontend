import { SortingEnum, sortMenu } from '@/app/types/products.interface'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Dispatch, FC, SetStateAction } from 'react'
import styles from './carousel/carousel.module.scss'

interface ISortMenu {
	currSortItem: SortingEnum
	setCurrSortItem: Dispatch<SetStateAction<SortingEnum>>
}

const SortMenu: FC<ISortMenu> = ({ currSortItem, setCurrSortItem }) => {

	const menuItem = sortMenu.find((item)=> item.sortType === currSortItem )

	return (
		<div className={styles['sort-menu']}>
			<Menu>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
					{menuItem?.name}
				</MenuButton>
				<MenuList>
					{sortMenu.map(menuItem => {
						return (
							<MenuItem key={menuItem.sortType} onClick={() => setCurrSortItem(menuItem.sortType)}>
								{menuItem.name}
							</MenuItem>
						)
					})}
				</MenuList>
			</Menu>
		</div>
	)
}

export default SortMenu
