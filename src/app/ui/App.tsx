import { FC } from 'react';
import { BrowserRouter, useLocation } from 'react-router';

import Layout from '../layout/Layout';
import { useMainApp } from '../lib/hooks/useMainApp';
import AppRouter from '../router/AppRouter';

import { Toast } from '@/entities/toast/ToastProvider';

const AppContent: FC = () => {
	const location = useLocation();

	if (location.pathname === '/auth') {
		return <AppRouter />;
	}

	return (
		<Layout>
			<AppRouter />
		</Layout>
	);
};

const App: FC = () => {
	const { showContent } = useMainApp();

	return (
		<BrowserRouter>
			<Toast>{showContent && <AppContent />}</Toast>
			<div
				id='debug-log'
				style={{
					position: 'fixed',
					top: '10px',
					right: '10px',
					background: 'rgba(0,0,0,0.8)',
					color: 'white',
					padding: '10px',
					borderRadius: '5px',
					fontSize: '12px',
					maxWidth: '300px',
					maxHeight: '400px',
					overflow: 'auto',
					zIndex: 9999,
					display: 'block'
				}}
			></div>
		</BrowserRouter>
	);
};

export default App;
