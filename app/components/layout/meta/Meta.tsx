import Head  from 'next/head'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import { IMeta } from './meta.interface'

const Meta: FC<PropsWithChildren<IMeta>> = ({
	title,
	description,
	image = '/images/logo.png',
	type = 'website',
}) => {

	const asPath = useRouter()
	const currentURl = `${process.env.APP_URL}${asPath}`

	return (
		<>
			<Head>
				<title itemProp='headline'>Coffee Shop | {title}</title>
				{
					description
						?
						(
							<>
								<meta name='description' itemProp='description' content={description} />
								<link rel="canonical" href={currentURl} />
								<meta property='og:type' content={type} />
								<meta property='og:locale' content='en' />
								<meta property='og:title' content={ title} />
								<meta property='og:url' content={currentURl } />
								<meta property='og:image' content={image} />
								<meta property='og:site_name' content="Coffee Shop" />
								<meta property='og:description' content={ description} />
							</>
						)
						: <meta name='robots' content='noindex, nofollow' />
				}
			</Head>
		</>
	)
}

export default Meta
