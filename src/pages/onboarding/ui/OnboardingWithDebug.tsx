import { Onboarding } from './Onboarding';
import { useMainApp } from '@/app/lib/hooks/useMainApp';

export const OnboardingWithDebug = () => {
	const { debugLog } = useMainApp();
	return <Onboarding debugLog={debugLog} />;
};
