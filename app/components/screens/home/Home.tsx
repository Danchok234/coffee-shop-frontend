import { FC, useEffect } from 'react'
import Layout, { variantEnum } from '../../layout/Layout'
import Carousel from '../../ui/catalog/carousel/Carousel'
import Heading from '../../ui/heading/Heading'
import { IMainPage } from '@/src/pages'
import { useActions } from '@/app/hooks/useActions'

const Home: FC<IMainPage> = ({ products }) => {

	const { changeSearchTerm } = useActions()
	
	useEffect(() => {
		changeSearchTerm({searchTerm:""})
	},[])

	return (
		<Layout variant={variantEnum.WITH_SEARCH} title='Home' description='Tasty coffee'>
			<Heading text={'Best coffee of all times'} />
			{
				products ? <Carousel products={products} /> : <h1 className={"text-green font-medium"}>Sorry, it is no products which are available now.</h1>
			}
			
		</Layout>
	)
}

export default Home
