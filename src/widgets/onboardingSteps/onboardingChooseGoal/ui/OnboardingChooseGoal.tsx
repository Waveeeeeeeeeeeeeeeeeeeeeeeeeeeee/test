import styles from './OnboardingChooseGoal.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useGoals } from '@/shared/lib/hooks/useGoals';

export const OnboardingChooseGoal = () => {
	const selectedGoal = useUserStore(state => state.profile.selectedGoal);
	const setProfileField = useUserStore(state => state.setProfileField);

	const { refGoals, t } = useGoals();

	const handleGoalChange = (goal: string[]) => {
		setProfileField('selectedGoal', goal);
	};

	return (
		<div className='flex flex-col gap-6 relative mb-20'>
			<h1 className={styles.title}>{t.title}</h1>
			<VariantSelection
				data={refGoals}
				selected={selectedGoal}
				multiple={true}
				shape='square'
				onSelect={value => handleGoalChange(value as string[])}
			/>
		</div>
	);
};
