import { useState } from 'react';

import { validateLocation } from '../api/validateLocation';
import GamePadIco from '../assets/gamepad.svg?react';
import MeetIco from '../assets/meet.svg?react';

import styles from './OnboardingChoosePerson.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';
import { Input } from '@/shared';
import CheckIco from '@/shared/ui/Input/assets/valid.svg?react';

const OnboardingChoosePerson = () => {
	const [isCountryValid, setIsCountryValid] = useState<boolean | null>(null);
	const [isCityValid, setIsCityValid] = useState<boolean | null>(null);

	const {
		title,
		title2,
		placeholderCountry,
		placeholderCity,
		labelCountry,
		labelCity,
		label1,
		label2,
		secLabel1,
		secLabel2
	} = useCustomTranslation('onboardingChoosePerson');
	const country = useUserStore(state => state.profile.country);
	const city = useUserStore(state => state.profile.city);

	const checkCountry = async (value: string) => {
		if (!value) {
			setIsCountryValid(false);
			return;
		}

		try {
			const response = await validateLocation({
				country_name: value,
				city_name: city || ''
			});
			if (response.data && response.data.detail !== 'Empty response') {
				setIsCountryValid(true);
			} else {
				setIsCountryValid(false);
			}
		} catch {
			setIsCountryValid(false);
		}
	};

	const checkCity = async (val: string) => {
		if (!val) {
			setIsCityValid(false);
			return;
		}

		try {
			const result = await validateLocation({
				country_name: country,
				city_name: val
			});

			if (result.data?.detail === 'Empty response') {
				setIsCityValid(false);
				return;
			}

			setIsCityValid(true);
		} catch (err) {
			console.error(err);
			setIsCityValid(false);
		}
	};

	const chooseVariant = [
		{
			code: 'realLife',
			label: label1,
			icon: MeetIco,
			seclabel: secLabel1,
			withContainer: true,
			content: (
				<div className='flex flex-col gap-5 mt-4'>
					<h3 className='text-md text-center font-semibold'>{title2}</h3>
					<Input
						data={{
							label: `${labelCountry}`,
							labelColor: 'text-[#8A8989]',
							name: 'country',
							type: 'text',
							placeholder: `${placeholderCountry}`,
							value: country,
							onChange: (val: string) => setProfileField('country', val),
							onBlur: (val: string) => checkCountry(val),
							iconRight:
								country.trim().length === 0 ? undefined : isCountryValid ? (
									<CheckIco />
								) : undefined
						}}
					/>

					<Input
						data={{
							label: `${labelCity}`,
							labelColor: 'text-[#8A8989]',
							name: 'city',
							type: 'text',
							placeholder: `${placeholderCity}`,
							value: city,
							onChange: (val: string) => setProfileField('city', val),
							onBlur: (val: string) => checkCity(val),
							iconRight:
								city.trim().length === 0 ? undefined : isCityValid ? (
									<CheckIco />
								) : undefined
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
		<div className='relative mb-30'>
			<h2 className={styles.title}>{title}</h2>
			<div className='mt-6'>
				<VariantSelection
					data={chooseVariant}
					selected={selectedMatchType}
					onSelect={value => handleMatchTypeChange(value as string)}
				/>
			</div>
		</div>
	);
};

export default OnboardingChoosePerson;
