import { ProductService } from '@/app/services/ProductsService'
import { IProduct } from '@/app/types/products.interface'
import { useQuery } from 'react-query'

export const useProductNavigation = (productId: number) => {
	
	const { data } = useQuery({
		queryKey: ['getAllProducts'],
		queryFn: () => ProductService.getAllProducts(),
	}) 

	const prevProductId: number = productId - 1

	const nextProductId: number = productId + 1

	const nextProductSlug: string | undefined =Array.isArray(data)? data?.find(product => {
		return product.id === nextProductId
	})?.slug: undefined

	const prevProductSlug: string | undefined = Array.isArray(data)? data?.find(product => {
		return product.id === prevProductId
	})?.slug : undefined

	return {
		nextProductSlug,
		prevProductSlug,
		prevProductId,
		nextProductId,
	}
}
