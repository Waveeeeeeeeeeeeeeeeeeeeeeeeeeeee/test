import { type FC, Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router'

import { useMainApp } from '../lib/hooks/useMainApp.ts'

import Preloader from './preloader/Preloader.tsx'

const App = lazy(() => import('./App.tsx'))

const MainApp: FC = () => {
	const { handleAppLoaded, isAppLoaded, isShowApp } = useMainApp()
	return (
		<>
			{!isAppLoaded && <Preloader />}
			{isShowApp && (
				<BrowserRouter>
					<Suspense>
						<App handlerAppLoaded={handleAppLoaded} />
					</Suspense>
				</BrowserRouter>
			)}
		</>
	)
}

export default MainApp
