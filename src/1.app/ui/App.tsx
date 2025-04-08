import { type FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Layout from '../layout/Layout'
import RouterProvider from '../providers/router/RouterProvider'

const App: FC<any> = ({ handlerAppLoaded }) => {
	const navigate = useNavigate()
	const register = true
	useEffect(() => {
		handlerAppLoaded()
	}, [])

	useEffect(() => {
		if (register) {
			navigate('/onboarding')
		}
	}, [register])

	return (
		<>
			<Layout>
				<RouterProvider />
			</Layout>
		</>
	)
}

export default App
