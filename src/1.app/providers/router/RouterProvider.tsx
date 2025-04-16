import React, { type FC } from 'react'
import { Route, Routes, useLocation } from 'react-router'

import { routes } from './router.data'
import { IRoute } from './router.types'

const RouterProvider: FC = () => {
	const location = useLocation()

	const renderRoutes = (route: IRoute) => {
		if (route.children) {
			return (
				<Route key={route.path} path={route.path} element={<route.component />}>
					{route.children.map(child => {
						console.log(child)
						return (
							<Route
								key={`${route.path}/${child.path}`}
								path={child.path}
								element={React.createElement(child.element)}
							/>
						)
					})}
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
