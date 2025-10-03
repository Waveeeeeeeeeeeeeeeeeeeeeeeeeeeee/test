import { useRef } from 'react';

import { useCustomTranslation } from '@/shared';

export const useGoals = () => {
	const t = useCustomTranslation('onboardingChooseGoal');

	const refGoals = useRef([
		{ code: 'justPlay', label: t.labelJustPlay },
		{ code: 'conquerer', label: t.labelConquerer },
		{ code: 'tdm', label: t.labelTdm },
		{ code: 'ultimateRoyal', label: t.labelUltimateRoyal },
		{ code: 'snuggle', label: t.labelSnuggle },
		{ code: 'duo', label: t.labelDuo },
		{ code: 'wow', label: t.labelWow }
	]);

	return { refGoals: refGoals.current, t };
};
