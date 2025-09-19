import styles from './OnboardingChoosePrime.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';

const primeTimes = [
	{ code: 'morning', label: 'Утро (6:00 - 12:00)' },
	{ code: 'afternoon', label: 'День (12:00 - 18:00)' },
	{ code: 'evening', label: 'Вечер (18:00 - 00:00)' },
	{ code: 'night', label: 'Ночь (00:00 - 6:00)' }
];

export const OnboardingChoosePrime = () => {
	const selectedPrime = useUserStore(state => state.profile.selectedPrime);
	const setProfileField = useUserStore(state => state.setProfileField);

	const handlePrimeChange = (prime: string[]) => {
		setProfileField('selectedPrime', prime);
	};

	return (
		<div className='flex flex-col gap-6 relative mb-20'>
			<h1 className={styles.title}>Время основной активности</h1>
			<h2 className={styles.description}>(+3 UTC)</h2>
			<VariantSelection
				data={primeTimes}
				selected={selectedPrime}
				multiple={true}
				shape='square'
				onSelect={value => handlePrimeChange(value as string[])}
			/>
		</div>
	);
};
