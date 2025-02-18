import { type FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router'

import Layout from '../layout/Layout'
import RouterProvider from '../providers/router/RouterProvider'

const App: FC<any> = ({ handlerAppLoaded }) => {
	useEffect(() => {
		handlerAppLoaded()
	}, [])

	return (
		<>
			<BrowserRouter>
				<Layout>
					<RouterProvider />
				</Layout>
			</BrowserRouter>
		</>
	)
}

export default App
