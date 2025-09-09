import clsx from 'clsx'

import GbIco from '../assets/gb.svg?react'
import RuIco from '../assets/ru.svg?react'
import UaIco from '../assets/ua.svg?react'

import styles from './OnboardingStep1.module.css'
import { useUserStore } from '@/entities/user/model/store'
import VariantSelection from '@/features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/shared'

const languages = [
	{ code: 'ru', label: 'Русский', flag: RuIco },
	{ code: 'ua', label: 'Український', flag: UaIco },
	{ code: 'en', label: 'English', flag: GbIco }
]

export const OnboardingStep1 = () => {
	const selectedLanguage = useUserStore(state => state.profile.selectedLanguage)
	const setProfileField = useUserStore(state => state.setProfileField)

	const { title, desription } = useCustomTranslation('onboardingStep1')

	const handleLanguageChange = (language: string) => {
		setProfileField('selectedLanguage', language)
	}

	return (
		<div className='flex flex-col gap-6 relative'>
			<div>
				<h1 className={clsx(styles.title, 'font-gilroy')}>{title}</h1>
				<p className={styles.description}>{desription}</p>
			</div>
			<VariantSelection
				data={languages}
				selected={selectedLanguage}
				onSelect={handleLanguageChange}
			/>
		</div>
	)
}
