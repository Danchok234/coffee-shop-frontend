import { ChakraProvider } from '@chakra-ui/react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../../styles/global.scss'

import { persistor, store } from '@/app/store/store'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {
	const queryClient = new QueryClient()

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<PersistGate loading={<h1>loading.... </h1>} persistor={persistor}>
					<ChakraProvider>
						<Head>
							<link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
							<link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
							<link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
							<link rel='manifest' href='/favicons/site.webmanifest' />
							<link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#5bbad5' />
							<meta name='msapplication-TileColor' content='#da532c' />
							<meta name='theme-color' content='#ffffff' />
						</Head>
						<Component {...pageProps} />
					</ChakraProvider>
				</PersistGate>
			</QueryClientProvider>
		</Provider>
	)
}

export default App
