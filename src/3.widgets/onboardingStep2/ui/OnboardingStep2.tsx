import { useMatchStore } from '../model/match'

import styles from './OnboardingStep2.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'
import { NumericList } from '@/6.shared/ui/NumericList'

const OnboardingStep2 = () => {
	const { firstchoose, secondChoose, title, description, label1, label2 } =
		useCustomTranslation('onboardingStep2')
	const chooseVariant = [
		{ code: 'realLife', label: label1 },
		{ code: 'online', label: label2 }
	]

	const chooseText = [firstchoose, secondChoose]
	const { selectedMatchType, setMatchType } = useMatchStore()
	return (
		<div>
			<h1
				className={styles.title}
				dangerouslySetInnerHTML={{ __html: title }}
			></h1>
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{ __html: description }}
			></p>
			<NumericList data={chooseText} />
			<div className=' mt-6'>
				<VariantSelection
					data={chooseVariant}
					selectedLanguage={selectedMatchType}
					setLanguage={setMatchType}
				/>
			</div>
		</div>
	)
}

export default OnboardingStep2
