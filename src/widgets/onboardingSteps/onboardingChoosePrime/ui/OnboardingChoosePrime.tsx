import { useMemo } from 'react';

import styles from './OnboardingChoosePrime.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';

export const OnboardingChoosePrime = () => {
	const selectedPrime = useUserStore(state => state.profile.selectedPrime);
	const setProfileField = useUserStore(state => state.setProfileField);

	const t = useCustomTranslation('onboardingChoosePrime');

	const primeTimes = useMemo(
		() => [
			{ code: 'morning', label: t.labelMorning },
			{ code: 'afternoon', label: t.labelAfternoon },
			{ code: 'evening', label: t.labelEvening },
			{ code: 'night', label: t.labelNight }
		],
		[t]
	);

	const handlePrimeChange = (prime: string[]) => {
		setProfileField('selectedPrime', prime);
	};

	return (
		<div className='flex flex-col gap-6 relative mb-20'>
			<h1 className={styles.title}>{t.title}</h1>
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
