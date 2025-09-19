import { useMemo } from 'react';

import styles from './OnboardingChooseGoal.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';

export const OnboardingChooseGoal = () => {
	const selectedGoal = useUserStore(state => state.profile.selectedGoal);
	const setProfileField = useUserStore(state => state.setProfileField);

	const t = useCustomTranslation('onboardingChooseGoal');

	const goals = useMemo(
		() => [
			{ code: 'justPlay', label: t.labelJustPlay },
			{ code: 'conquerer', label: t.labelConquerer },
			{ code: 'tdm', label: t.labelTdm },
			{ code: 'ultimateRoyal', label: t.labelUltimateRoyal },
			{ code: 'snuggle', label: t.labelSnuggle },
			{ code: 'duo', label: t.labelDuo },
			{ code: 'wow', label: t.labelWow }
		],
		[t]
	);

	const handleGoalChange = (goal: string[]) => {
		setProfileField('selectedGoal', goal);
	};

	return (
		<div className='flex flex-col gap-6 relative mb-20'>
			<h1 className={styles.title}>{t.title}</h1>
			<VariantSelection
				data={goals}
				selected={selectedGoal}
				multiple={true}
				shape='square'
				onSelect={value => handleGoalChange(value as string[])}
			/>
		</div>
	);
};
