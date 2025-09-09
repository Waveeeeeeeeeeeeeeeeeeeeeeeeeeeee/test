import { FC, Suspense, lazy, useEffect, useState } from 'react'
import { HashRouter } from 'react-router'

import { useMainApp } from '../lib/hooks/useMainApp'
import { ToastProvider } from '../providers/toast/ToastProvider'

import Preloader from './preloader/Preloader'

const App = lazy(() => import('./App'))

const MainApp: FC = () => {
	const { showContent, shouldRedirectToOnboarding } = useMainApp()
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(true)

	useEffect(() => {
		if (showContent) {
			const timer = setTimeout(() => setIsPreloaderVisible(false), 300)
			return () => clearTimeout(timer)
		}
	}, [showContent])

	return (
		<HashRouter>
			<ToastProvider>
				{isPreloaderVisible && <Preloader />}

				<div
					style={{
						opacity: showContent && !isPreloaderVisible ? 1 : 0,
						transition: 'opacity 300ms ease-in-out'
					}}
				>
					{showContent && shouldRedirectToOnboarding !== null && (
						<Suspense fallback={null}>
							<App shouldRedirectToOnboarding={shouldRedirectToOnboarding} />
						</Suspense>
					)}
				</div>
			</ToastProvider>
		</HashRouter>
	)
}

export default MainApp
