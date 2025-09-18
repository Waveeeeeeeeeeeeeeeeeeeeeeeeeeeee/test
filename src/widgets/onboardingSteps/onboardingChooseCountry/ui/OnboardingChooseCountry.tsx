import { AxiosError } from 'axios';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { validateCountry } from '../api/validateCountry';

import styles from './OnboardingChooseCountry.module.css';
import { useUserStore } from '@/entities/user/model/store';
import { Input } from '@/shared';
import AddIco from '@/shared/assets/icons/add.svg?react';
import CheckIco from '@/shared/ui/Input/assets/valid.svg?react';

type CountryData = {
	country: string;
	country_code: string;
};

type ErrorResponse = {
	detail: string;
};

export const OnboardingChooseCountry = () => {
	const { profile, setProfileField } = useUserStore();
	const [searchCountry, setSearchCountry] = useState('');
	const [searchCountryError, setSearchCountryError] = useState<
		string | undefined
	>(undefined);
	const [countryData, setCountryData] = useState<CountryData | null>(null);
	const [isValidCountry, setIsValidCountry] = useState(false);
	const [isEditing, setIsEditing] = useState(true);

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
		if (isValidCountry && countryData) {
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

	return (
		<div className='z-10 '>
			<h1 className={clsx(styles.title, 'font-gilroy')}>Выбор стран</h1>
			<p className={styles.description}>
				Выбери страны геймеров, с кем ты бы хотел{' '}
				<span className='block'>познакомиться</span>
			</p>

			{isEditing ? (
				<div className='mt-6'>
					<Input
						data={{
							type: 'text',
							name: 'country',
							placeholder: 'Введите название страны',
							label: 'Введите страну',
							labelSize: 'text-md',
							value: searchCountry,
							notification: searchCountryError,
							iconRight: isValidCountry ? <CheckIco /> : undefined,
							onChange: (value: string) => setSearchCountry(value)
						}}
					/>

					{isValidCountry && (
						<button
							className='bg-violet-600 h-12 w-full rounded-2xl mt-4 font-semibold flex items-center justify-center gap-2'
							onClick={handleSaveCountry}
						>
							Сохранить
						</button>
					)}
				</div>
			) : (
				<button
					className='bg-[#201E1D] h-12 w-full rounded-2xl mt-6 font-semibold flex items-center justify-center gap-2'
					onClick={() => setIsEditing(true)}
				>
					Добавить еще{' '}
					<span className='translate-y-[2px]'>
						<AddIco />
					</span>
				</button>
			)}

			{profile.selectedCountry?.length > 0 && (
				<ul className='mt-6 mb-20 space-y-2'>
					{profile.selectedCountry.map((country: string) => (
						<li
							key={country}
							className='bg-[#2A2827] px-4 py-2 rounded-xl text-white flex items-center justify-between'
						>
							<span>{country}</span>
							<button
								onClick={() => handleRemoveCountry(country)}
								className='ml-3 text-gray-400 hover:text-white'
							>
								<X size={18} />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
