import styles from './OnboardingChooseGoal.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';

const goals = [
	{ code: 'justPlay', label: 'Просто поиграть' },
	{ code: 'conquerer', label: 'Завоеватель' },
	{ code: 'tdm', label: 'TDM' },
	{ code: 'ultimateRoyal', label: 'Королевская битва' },
	{ code: 'snuggle', label: 'Праки' },
	{ code: 'duo', label: 'Дуо' },
	{ code: 'wow', label: 'WoW' }
];

export const OnboardingChooseGoal = () => {
	const selectedGoal = useUserStore(state => state.profile.selectedGoal);
	const setProfileField = useUserStore(state => state.setProfileField);

	const handleGoalChange = (goal: string[]) => {
		setProfileField('selectedGoal', goal);
	};

	return (
		<div className='flex flex-col gap-6 relative mb-20'>
			<h1 className={styles.title}>Выбери цель игр</h1>
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
