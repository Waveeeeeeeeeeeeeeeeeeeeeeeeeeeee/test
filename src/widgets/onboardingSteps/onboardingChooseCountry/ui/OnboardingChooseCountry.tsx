import clsx from 'clsx';
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

export const OnboardingChooseCountry = () => {
	const { profile, setProfileField } = useUserStore();
	const [searchCountry, setSearchCountry] = useState('');
	const [searchCountryError, setSearchCountryError] = useState<
		string | undefined
	>(undefined);
	const [countryData, setCountryData] = useState<CountryData | null>(null);
	const [isValidCountry, setIsValidCountry] = useState(false);

	const handleValidate = async (name: string) => {
		try {
			const result = await validateCountry({ country_name: name });

			// axios возвращает { data, status, ... }
			const data = result.data;

			// ❌ если API вернул detail → ошибка
			if ('detail' in data) {
				setSearchCountryError(data.detail);
				setCountryData(null);
				setIsValidCountry(false);
				return;
			}

			// ✅ валидная страна
			setCountryData(data);
			setSearchCountryError(undefined);
			setIsValidCountry(true);
			console.log('countryData', data);
		} catch (err: any) {
			setSearchCountryError(err?.detail || 'Ошибка валидации');
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

	return (
		<div className='z-10 '>
			<h1 className={clsx(styles.title, 'font-gilroy')}>Выбор стран</h1>
			<p className={styles.description}>
				Выбери страны геймеров, с кем ты бы хотел {''}
				<span className='block'>познакомиться</span>
			</p>
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
						// 🔥 иконка только если страна валидна
						iconRight: isValidCountry ? <CheckIco /> : undefined,
						onChange: (value: string) => {
							setSearchCountry(value);
						}
					}}
				/>

				<button className='bg-[#201E1D] h-12 w-full rounded-2xl mt-6 font-semibold flex items-center justify-center gap-2'>
					Добавить еще{' '}
					<span className='translate-y-[2px]'>
						<AddIco />
					</span>
				</button>
			</div>

			{/* <ul>
				{profile.selectedCountry.map(country => (
					<li key={country}>{country}</li>
				))}
			</ul> */}
		</div>
	);
};
