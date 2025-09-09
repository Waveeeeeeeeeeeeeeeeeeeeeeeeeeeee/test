import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Layout from '../layout/Layout';
import AppRouter from '../router/AppRouter';

interface AppProps {
	shouldRedirectToOnboarding: boolean;
}

const App: FC<AppProps> = ({ shouldRedirectToOnboarding }) => {
	const navigate = useNavigate();
	const [hasNavigated, setHasNavigated] = useState(false);

	useEffect(() => {
		if (!hasNavigated && shouldRedirectToOnboarding !== null) {
			navigate(shouldRedirectToOnboarding ? '/onboarding' : '/', {
				replace: true
			});
			setHasNavigated(true);
		}
	}, [shouldRedirectToOnboarding, navigate, hasNavigated]);

	return (
		<Layout>
			<AppRouter />
		</Layout>
	);
};

export default App;
