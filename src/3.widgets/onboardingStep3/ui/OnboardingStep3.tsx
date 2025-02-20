import bgHeader from '../assets/bg.svg'
import { useCurrentPlatform } from '../model/currentPlatform'

import styles from './OnboardingStep3.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'

export const OnboardingStep3 = () => {
	const { selectPlatform, setSelectedPlatform } = useCurrentPlatform()
	const { title, label1, label2 } = useCustomTranslation('onboardingStep3')

	const chooseVariant = [
		{ code: 'webApp', label: label1 },
		{ code: 'bot', label: label2 }
	]
	return (
		<div>
			<div className={styles.header}>
				<img src={bgHeader} alt='bg' className={styles.headerImage} />
			</div>
			<div>
				<h2 className={styles.title}>{title}</h2>
			</div>
			<VariantSelection
				data={chooseVariant}
				selectedLanguage={selectPlatform}
				setLanguage={setSelectedPlatform}
			/>
		</div>
	)
}
