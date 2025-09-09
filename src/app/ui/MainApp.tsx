import { FC, useEffect, useState } from 'react';
import { HashRouter } from 'react-router';

import { useMainApp } from '../lib/hooks/useMainApp';

import App from './App';
import Preloader from './preloader/Preloader';
import { Toast } from '@/entities/toast/ToastProvider';

const MainApp: FC = () => {
	const { showContent, shouldRedirectToOnboarding } = useMainApp();
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

	useEffect(() => {
		if (showContent) {
			const timer = setTimeout(() => setIsPreloaderVisible(false), 300);
			return () => clearTimeout(timer);
		}
	}, [showContent]);

	return (
		<HashRouter>
			<Toast>
				{isPreloaderVisible && <Preloader />}

				<div
					style={{
						opacity: showContent && !isPreloaderVisible ? 1 : 0,
						transition: 'opacity 300ms ease-in-out'
					}}
				>
					{showContent && shouldRedirectToOnboarding !== null && (
						<App shouldRedirectToOnboarding={shouldRedirectToOnboarding} />
					)}
				</div>
			</Toast>
		</HashRouter>
	);
};

export default MainApp;
