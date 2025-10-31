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
		</Layout>);

};

const App: FC = () => {
  const { showContent } = useMainApp();

  return (
    <BrowserRouter>
			<Toast>{showContent && <AppContent />}</Toast>
			<div
				id='debug-log'
				style={{
					display: 'none'
				}}
			></div>
		</BrowserRouter>
	);
};

export default App;