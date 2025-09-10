import GamePadIco from '../assets/gamepad.svg?react';
import MeetIco from '../assets/meet.svg?react';

import styles from './OnboardingChoosePerson.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';
import { Input } from '@/shared';

const OnboardingChoosePerson = () => {
	const { title, label1, label2, secLabel1, secLabel2 } = useCustomTranslation(
		'onboardingChoosePerson'
	);

	const chooseVariant = [
		{
			code: 'realLife',
			label: label1,
			icon: MeetIco,
			seclabel: secLabel1,
			withContainer: true,
			content: (
				<div className='flex flex-col gap-4 mt-4'>
					<h3 className='text-md text-center font-semibold'>
						Где вы проживаете?
					</h3>
					<Input
						data={{
							label: 'Страна',
							name: 'country',
							type: 'text',
							placeholder: 'Найти страну',
							onChange: () => {}
						}}
					/>
					<Input
						data={{
							label: 'Город',
							name: 'city',
							type: 'text',
							placeholder: 'Москва',
							onChange: () => {}
						}}
					/>
				</div>
			)
		},
		{
			code: 'online',
			label: label2,
			icon: GamePadIco,
			seclabel: secLabel2
		}
	];

	const selectedMatchType = useUserStore(
		state => state.profile.selectedMatchType
	);
	const setProfileField = useUserStore(state => state.setProfileField);

	const handleMatchTypeChange = (type: string) => {
		setProfileField('selectedMatchType', type);
	};

	return (
		<div className='relative'>
			<h2 className={styles.title}>{title}</h2>
			<div className='mt-6'>
				<VariantSelection
					data={chooseVariant}
					selected={selectedMatchType}
					onSelect={handleMatchTypeChange}
				/>
			</div>
		</div>
	);
};

export default OnboardingChoosePerson;
