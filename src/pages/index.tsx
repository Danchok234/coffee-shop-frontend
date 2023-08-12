import Home from '@/app/components/screens/home/Home'
import { useTypedSelector } from '@/app/hooks/useTypedSelector'
import { ProductService } from '@/app/services/ProductsService'
import { IProduct } from '@/app/types/products.interface'
import { GetStaticProps, NextPage } from 'next'

export interface IMainPage {
	products: IProduct[] | IProduct
}

const index: NextPage<IMainPage> = ({ products }) => {

	return (
			<Home products={products} />
	)
}
export const getStaticProps: GetStaticProps<IMainPage> = async () => {

	const products = await ProductService.getAllProducts()

	return {
		props: {
			products,
		},
	}
}

export default index
