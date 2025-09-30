import clsx from 'clsx';
import { useEffect } from 'react';

import GbIco from '../assets/gb.svg?react';
import RuIco from '../assets/ru.svg?react';
import UaIco from '../assets/ua.svg?react';

import styles from './OnboardingChooseLanguage.module.css';
import { useUserStore } from '@/entities/user/model/store';
import { reqLogin } from '@/features/auth/api/reqLogin';
import { generateMockInitData } from '@/features/auth/utils/mockInitData';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { useCustomTranslation } from '@/shared';

const languages = [
	{ code: 'ru', label: 'Русский', icon: RuIco },
	{ code: 'ua', label: 'Український', icon: UaIco },
	{ code: 'en', label: 'English', icon: GbIco }
];

export const OnboardingChooseLanguage = () => {
	const selectedLanguage = useUserStore(
		state => state.profile.selectedLanguage
	);
	const setProfileField = useUserStore(state => state.setProfileField);

	const { title, desription } = useCustomTranslation(
		'onboardingChooseLanguage'
	);

	const handleLanguageChange = (language: string) => {
		setProfileField('selectedLanguage', language);
	};

	useEffect(() => {
		const req = async () => {
			try {
				const mockInitData = await generateMockInitData();
				console.log('InitData ready:', mockInitData);

				const safeInitData = encodeURIComponent(mockInitData);
				const res = await reqLogin(safeInitData);
				console.log('Login response:', res.data);
			} catch (e: any) {
				console.error('Login failed:', e.response?.data || e.message);
			}
		};

		req();
	}, []);

	return (
		<div className='flex flex-col gap-6 relative'>
			<div>
				<h1 className={clsx(styles.title, 'font-gilroy')}>{title}</h1>
				<p className={styles.description}>{desription}</p>
			</div>
			<VariantSelection
				data={languages}
				selected={selectedLanguage}
				onSelect={value => handleLanguageChange(value as string)}
			/>
		</div>
	);
};
