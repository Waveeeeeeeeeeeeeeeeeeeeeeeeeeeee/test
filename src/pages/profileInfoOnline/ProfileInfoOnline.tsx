import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { Input } from '@/shared';
import { useCustomTranslation } from '@/shared';
import AddIco from '@/shared/assets/icons/add.svg?react';
import DeleteIco from '@/shared/assets/icons/delete.svg?react';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import { useGoals } from '@/shared/lib/hooks/useGoals';
import CheckIco from '@/shared/ui/Input/assets/valid.svg?react';
import { QualityDescriptionIndicator } from '@/shared/ui/QualityDescriptionIndicator/QualityDescriptionIndicator';
import { TextArea } from '@/shared/ui/TextArea';
import { qualityOfDescription } from '@/widgets/onboardingSteps/onboardingAboutMe/api/qualityOfDescription';
import { validateCountry } from '@/widgets/onboardingSteps/onboardingChooseCountry/api/validateCountry';

type CountryData = {
	country: string;
	country_code: string;
};

type ErrorResponse = {
	detail: string;
};

const ProfileInfoOnline = () => {
	const { profile, setProfileField } = useUserStore();
	const [searchCountry, setSearchCountry] = useState('');
	const [searchCountryError, setSearchCountryError] = useState<
		string | undefined
	>(undefined);
	const [countryData, setCountryData] = useState<CountryData | null>(null);
	const [isValidCountry, setIsValidCountry] = useState(false);
	const [isEditing, setIsEditing] = useState(true);
	const controllerRef = useRef<AbortController | null>(null);

	const { refGoals } = useGoals();
	const { labelMorning, labelAfternoon, labelEvening, labelNight } =
		useCustomTranslation('onboardingChoosePrime');

	const handleValidate = async (name: string) => {
		try {
			const result = await validateCountry({ country_name: name });
			const data = result.data;

			if ('detail' in data) {
				setSearchCountryError(data.detail);
				setCountryData(null);
				setIsValidCountry(false);
				return;
			}

			setCountryData(data);
			setSearchCountryError(undefined);
			setIsValidCountry(true);
		} catch (err) {
			let message = 'Ошибка валидации';

			const axiosError = err as AxiosError<ErrorResponse>;
			if (axiosError.response?.data?.detail) {
				message = axiosError.response.data.detail;
			}

			setSearchCountryError(message);
			setCountryData(null);
			setIsValidCountry(false);
		}
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchCountry.length > 2) {
				handleValidate(searchCountry);
			} else {
				setIsValidCountry(false);
				setCountryData(null);
				setSearchCountryError(undefined);
			}
		}, 500);

		return () => clearTimeout(handler);
	}, [searchCountry]);

	const handleSaveCountry = () => {
		if (
			isValidCountry &&
			countryData &&
			!profile.selectedCountry.includes(countryData.country)
		) {
			setProfileField('selectedCountry', [
				...(profile.selectedCountry || []),
				countryData.country
			]);
			setSearchCountry('');
			setCountryData(null);
			setIsValidCountry(false);
			setIsEditing(false);
		}
	};

	const handleRemoveCountry = (country: string) => {
		setProfileField(
			'selectedCountry',
			profile.selectedCountry.filter((c: string) => c !== country)
		);
	};

	const handleGoalChange = (goal: string[]) => {
		setProfileField('selectedGoal', goal);
	};

	const primeTimes = [
		{ code: 'morning', label: labelMorning },
		{ code: 'afternoon', label: labelAfternoon },
		{ code: 'evening', label: labelEvening },
		{ code: 'night', label: labelNight }
	];

	const handlePrimeChange = (prime: string[]) => {
		setProfileField('selectedPrime', prime);
	};

	useEffect(() => {
		const text = profile.about?.trim();

		controllerRef.current?.abort();

		if (!text) {
			setProfileField?.('qualityOfDescription', -4);
			return;
		}

		const controller = new AbortController();
		controllerRef.current = controller;

		const debounceReq = setTimeout(async () => {
			try {
				const res = await qualityOfDescription({ description: text });
				setProfileField?.('qualityOfDescription', res.data.evaluation);
			} catch (err) {}
		}, 2000);

		return () => {
			clearTimeout(debounceReq);
			controller.abort();
		};
	}, [profile.about, setProfileField]);

	return (
		<div className='px-4 pt-4 pb-28 flex flex-col gap-6'>
			<NotificationHeaderFactory
				title='Инфо: Просто поиграть'
				IsBack={true}
				notification={false}
			/>
			<div>
				<h3 className='text-lg font-semibold mb-4 text-white'>
					Введите страну
				</h3>

				{isEditing ? (
					<div className='mt-6'>
						<Input
							data={{
								type: 'text',
								name: 'country',
								placeholder: 'Введите страну',
								label: '',
								labelSize: 'text-md',
								value: searchCountry,
								notification: searchCountryError,
								iconRight: isValidCountry ? <CheckIco /> : undefined,
								onChange: (value: string) => setSearchCountry(value)
							}}
						/>

						{isValidCountry && (
							<button
								className='bg-[#6B5CD1] h-12 w-full rounded-2xl mt-4 font-semibold flex items-center justify-center gap-2'
								onClick={handleSaveCountry}
							>
								Добавить
							</button>
						)}
					</div>
				) : null}

				{profile.selectedCountry?.length > 0 && (
					<div className='mt-6 space-y-2'>
						{profile.selectedCountry.map((country: string) => (
							<div key={country} className='flex items-center gap-2'>
								<div className='w-[95%] bg-[var(--second-bg)] border border-[#32302F] px-4 py-4 rounded-2xl text-white'>
									<span>{country}</span>
								</div>
								<div className='w-[5%] flex justify-center'>
									<button
										onClick={() => handleRemoveCountry(country)}
										className='p-1 transition-colors'
										title='Удалить'
									>
										<DeleteIco fill='#9CA3AF' width={24} height={24} />
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{!isEditing && (
					<button
						className='bg-[#201E1D] h-12 w-full rounded-2xl mt-6 font-semibold flex items-center justify-center gap-2'
						onClick={() => setIsEditing(true)}
					>
						Добавить ещё
						<span className='translate-y-[2px]'>
							<AddIco />
						</span>
					</button>
				)}
			</div>

			<div>
				<h3 className='text-lg font-semibold mb-4 text-white'>Цели игр</h3>
				<VariantSelection
					data={refGoals}
					selected={profile.selectedGoal}
					multiple={true}
					shape='square'
					onSelect={value => handleGoalChange(value as string[])}
				/>
			</div>

			<div>
				<h3 className='text-lg font-semibold mb-4 text-white'>
					Время основной активности
				</h3>
				<VariantSelection
					data={primeTimes}
					selected={profile.selectedPrime}
					multiple={true}
					shape='square'
					onSelect={value => handlePrimeChange(value as string[])}
				/>
			</div>

			<div>
				<TextArea
					data={{
						label: 'Описание вашей виртуальной жизни',
						name: 'about',
						placeholder: 'Расскажите о себе...',
						value: profile.about || '',
						minLength: 30,
						maxLength: 400,
						notification: `${profile.about?.length || 0}/400 символов`,
						onChange: (value: string) => setProfileField('about', value)
					}}
				/>
				<QualityDescriptionIndicator />
			</div>
		</div>
	);
};

export default AnimatedPage(ProfileInfoOnline);
