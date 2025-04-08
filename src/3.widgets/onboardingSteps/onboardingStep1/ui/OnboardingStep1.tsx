import clsx from 'clsx'

import GbIco from '../assets/gb.svg?react'
import RuIco from '../assets/ru.svg?react'
import UaIco from '../assets/ua.svg?react'
import { useLanguageStore } from '../model/language'

import styles from './OnboardingStep1.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'

const languages = [
	{ code: 'ru', label: 'Русский', flag: RuIco },
	{ code: 'uk', label: 'Український', flag: UaIco },
	{ code: 'en', label: 'English', flag: GbIco }
]

export const OnboardingStep1 = () => {
	const { selectedLanguage, setLanguage } = useLanguageStore()
	const { title, desription } = useCustomTranslation('onboardingStep1')
	return (
		<div className='flex flex-col gap-6 relative'>
			<div>
				<h1 className={clsx(styles.title, 'font-gilroy')}>{title}</h1>
				<p className={styles.description}>{desription}</p>
			</div>
			<VariantSelection
				data={languages}
				selectedLanguage={selectedLanguage}
				setLanguage={setLanguage}
			/>
		</div>
	)
}
