import ProductDetails from '@/app/components/screens/product-details/ProductDetails'
import { ProductService } from '@/app/services/ProductsService'
import { IProduct } from '@/app/types/products.interface'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useQuery } from 'react-query'

export interface IProductDetails {
	product: IProduct
}

const ProductDetailsPage: NextPage<IProductDetails> = ({ product }) => {
	return <ProductDetails product={product} />
}

export const getStaticProps: GetStaticProps<IProductDetails> = async ({ params }) => {
	const product = await ProductService.getProductBySlug(params?.slug)

	return {
		props: {
			product,
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	
	const products: IProduct[] | IProduct = await ProductService.getAllProducts()

	const paths = Array.isArray(products)
		? products.map(product => {
				return {
					params: { slug: product.slug },
				}
		  })
		: [
				{
					params: { slug: products.slug },
				},
		  ]

	return {
		paths,
		fallback: false,
	}
}

export default ProductDetailsPage
