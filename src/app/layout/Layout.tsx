import { type FC, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

import { BottomNavigation } from '@/widgets/bottomNavigation/ui/BottomNavigation';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation();
	const disabledBottom = [
		'/profile/settings',
		'/profile/games',
		'/profile/rules',
		'/profile/support',
		'/onboarding',
		'/notifications'
	].includes(location.pathname);

	return (
		<div
			style={{ backgroundColor: 'black' }}
			className='flex flex-col min-h-screen overflow-hidden '
		>
			{children}
			{!disabledBottom && <BottomNavigation />}
		</div>
	);
};

export default Layout;
