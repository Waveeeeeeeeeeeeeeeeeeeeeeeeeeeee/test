import { type FC } from 'react'
import { Route, Routes, useLocation } from 'react-router'

import { routes } from './router.data'
import { IRoute } from './router.types'

const RouterProvider: FC = () => {
	const location = useLocation()

	const renderRoutes = (route: IRoute) => {
		if (route.children) {
			return (
				<Route key={route.path} path={route.path} element={<route.component />}>
					{route.children.map(child => (
						<Route
							key={`${route.path}/${child.path}`}
							path={child.path}
							element={<route.component />}
						/>
					))}
				</Route>
			)
		}
		return (
			<Route key={route.path} path={route.path} element={<route.component />} />
		)
	}

	return (
		<Routes location={location} key={location.pathname}>
			{routes.map(renderRoutes)}
		</Routes>
	)
}

export default RouterProvider
