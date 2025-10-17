import { useMainApp } from '@/app/lib/hooks/useMainApp';
import { Onboarding } from './Onboarding';

export const OnboardingWithDebug = () => {
	const { debugLog } = useMainApp();
	return <Onboarding debugLog={debugLog} />;
};
