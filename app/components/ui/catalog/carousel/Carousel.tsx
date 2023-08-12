import { IProduct, SortingEnum } from '@/app/types/products.interface'
import { FC, useState } from 'react'

import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { ProductService } from '@/app/services/ProductsService'
import { useQuery } from 'react-query'
import SortMenu from '../SortMenu'
import CarouselItem from './carousel-item/CarouselItem'
import styles from './carousel.module.scss'

const Carousel: FC<{ products: IProduct[]|IProduct }> = ({ products }) => {
	const [currSortItem, setCurrSortItem] = useState<SortingEnum>(SortingEnum.NEWEST)

	const { searchTerm } = useTypedSelector(state => state.persistedReducer.search)

	const { data } = useQuery<IProduct | IProduct[] | null>({
		queryKey: ['allProducts', currSortItem, searchTerm],
		queryFn: () => ProductService.getAllProductsWithSortingAndSearching(currSortItem, searchTerm),
		initialData: products,
	})

	return (
		<>
			<SortMenu currSortItem={currSortItem} setCurrSortItem={setCurrSortItem} />
			<div className={styles.carousel}>
				{Array.isArray(data) ? (
					data?.map((product: IProduct, index: number) => {
						return <CarouselItem selfIndex={index} key={product.id} product={product} />
					})
				) : data ? (
					<CarouselItem selfIndex={0} key={0} product={data} />
				) : (
					<h1> Nothing was found for your search request</h1>
				)}
			</div>
		</>
	)
}

export default Carousel
