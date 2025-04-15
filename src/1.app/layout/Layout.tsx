import { type FC, type PropsWithChildren } from 'react'
import { useLocation } from 'react-router'

import { BottomNavigation } from '@/3.widgets/bottomNavigation/ui/BottomNavigation'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation()
	const isOnboardingPage = location.pathname === '/onboarding'

	return (
		<div
			style={{ backgroundColor: 'black' }}
			className='flex flex-col min-h-screen overflow-hidden '
		>
			{children}
			{!isOnboardingPage && <BottomNavigation />}
		</div>
	)
}

export default Layout
