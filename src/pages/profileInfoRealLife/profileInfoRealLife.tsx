import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/entities/user/model/store';
import Search from '@/features/search/Search';
import { Input } from '@/shared';
import AddIco from '@/shared/assets/icons/add.svg?react';
import DeleteIco from '@/shared/assets/icons/delete.svg?react';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import CheckIco from '@/shared/ui/Input/assets/valid.svg?react';
import { QualityDescriptionIndicator } from '@/shared/ui/QualityDescriptionIndicator/QualityDescriptionIndicator';
import { TextArea } from '@/shared/ui/TextArea';
import { qualityOfDescription } from '@/widgets/onboardingSteps/onboardingAboutMe/api/qualityOfDescription';
import { validateLocation } from '@/widgets/onboardingSteps/onboardingChoosePerson/api/validateLocation';

const ProfileInfoRealLife = () => {
	const { profile, setProfileField, addInterest, removeInterest } =
		useUserStore();
	const [searchValue, setSearchValue] = useState('');
	const [isCountryValid, setIsCountryValid] = useState<boolean | null>(null);
	const [isCityValid, setIsCityValid] = useState<boolean | null>(null);
	const [customTagValue, setCustomTagValue] = useState('');
	const [isAddingCustomTag, setIsAddingCustomTag] = useState(false);
	const controllerRef = useRef<AbortController | null>(null);

	const availableInterests = [
		'Футбол',
		'Баскетбол',
		'Рисование',
		'Аниме',
		'Машины',
		'Фильмы',
		'Музыка',
		'Спорт',
		'Литература',
		'Программирование',
		'Фотография',
		'Путешествия',
		'Кулинария',
		'Танцы',
		'Йога'
	];

	const handleAddInterest = (interest: string) => {
		addInterest(interest);
		setSearchValue('');
	};

	const handleRemoveInterest = (interest: string) => {
		removeInterest(interest);
	};

	const handleAddCustomTag = () => {
		if (
			customTagValue.trim() &&
			!profile.interests?.includes(customTagValue.trim())
		) {
			handleAddInterest(customTagValue.trim());
			setCustomTagValue('');
			setIsAddingCustomTag(false);
		}
	};

	const handleStartAddingCustomTag = () => {
		setIsAddingCustomTag(true);
	};

	const handleCancelAddingCustomTag = () => {
		setIsAddingCustomTag(false);
		setCustomTagValue('');
	};

	const handleBlurCustomTag = () => {
		if (!customTagValue.trim()) {
			setIsAddingCustomTag(false);
			setCustomTagValue('');
		}
	};

	const checkCountry = async (value: string) => {
		if (!value) {
			setIsCountryValid(false);
			return;
		}

		try {
			const response = await validateLocation({
				country_name: value,
				city_name: profile.city || ''
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
				country_name: profile.country,
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
			} catch (err) {
				console.error(err);
			}
		}, 2000);

		return () => {
			clearTimeout(debounceReq);
			controller.abort();
		};
	}, [profile.about, setProfileField]);

	return (
		<div className='px-4 pt-4 pb-28 flex flex-col gap-6'>
			<NotificationHeaderFactory
				title='Инфо: Реальная встреча'
				IsBack={true}
				notification={false}
			/>

			<div>
				<Input
					data={{
						label: 'Страна проживания',
						name: 'country',
						type: 'text',
						placeholder: 'Введите страну',
						value: profile.country || '',
						onChange: (value: string) => setProfileField('country', value),
						onBlur: (value: string) => checkCountry(value),
						iconRight:
							profile.country?.trim().length ===
							0 ? undefined : isCountryValid ? (
								<CheckIco />
							) : undefined,
						labelSize: 'text-md'
					}}
				/>
			</div>

			<div>
				<Input
					data={{
						label: 'Город проживания',
						name: 'city',
						type: 'text',
						placeholder: 'Введите город',
						value: profile.city || '',
						onChange: (value: string) => setProfileField('city', value),
						onBlur: (value: string) => checkCity(value),
						iconRight:
							profile.city?.trim().length === 0 ? undefined : isCityValid ? (
								<CheckIco />
							) : undefined,
						labelSize: 'text-md'
					}}
				/>
			</div>

			<div>
				<TextArea
					data={{
						label: 'Описание вашей реальной жизни',
						name: 'about',
						placeholder: 'Расскажите о себе...',
						value: profile.about || '',
						minLength: 30,
						maxLength: 200,
						notification: `От 30 до 200 символов`,
						onChange: (value: string) => setProfileField('about', value)
					}}
				/>
				<QualityDescriptionIndicator />
			</div>

			<div>
				<h3 className='text-lg font-semibold mb-4 text-white'>
					Укажите свои интересы
				</h3>
				<Search
					tags={availableInterests}
					addInterest={handleAddInterest}
					placeholder='Поиск тегов'
					searchValue={searchValue}
					onSearchChange={setSearchValue}
				/>
				{isAddingCustomTag ? (
					<div className='border border-white/12 rounded-xl p-2 mb-4 flex items-center gap-2 bg-[var(--second-bg)]'>
						<input
							type='text'
							placeholder='Добавить свой интерес'
							className='flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400'
							value={customTagValue}
							onChange={e => setCustomTagValue(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleAddCustomTag();
								} else if (e.key === 'Escape') {
									handleCancelAddingCustomTag();
								}
							}}
							onBlur={handleBlurCustomTag}
							autoFocus
						/>
						<button
							type='button'
							onClick={handleAddCustomTag}
							disabled={!customTagValue.trim()}
							className='p-1 text-white disabled:text-gray-500 disabled:cursor-not-allowed'
						>
							<AddIco />
						</button>
					</div>
				) : (
					<button
						className='bg-[#6B5CD1] text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2'
						onClick={handleStartAddingCustomTag}
					>
						<span>Добавить свой</span>
						<span className='text-xl font-bold'>+</span>
					</button>
				)}

				{profile.interests && profile.interests.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{profile.interests.map((interest, index) => (
							<div
								key={index}
								className='border border-white/12 rounded-xl px-3 py-2 flex items-center gap-2 bg-[var(--second-bg)]'
							>
								<span className='text-white text-sm font-medium'>
									{interest}
								</span>
								<button
									onClick={() => handleRemoveInterest(interest)}
									className='p-1 transition-colors'
									title='Удалить'
								>
									<DeleteIco fill='#9CA3AF' className='hover:fill-red-700' />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default AnimatedPage(ProfileInfoRealLife);
