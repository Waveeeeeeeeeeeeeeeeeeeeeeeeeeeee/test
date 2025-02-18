import { type FC } from 'react'
import { Route, Routes, useLocation } from 'react-router'

import { routes } from './router.data'

const RouterProvider: FC = () => {
	const location = useLocation()
	return (
		<Routes location={location} key={location.pathname}>
			{routes.map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}
		</Routes>
	)
}

export default RouterProvider
