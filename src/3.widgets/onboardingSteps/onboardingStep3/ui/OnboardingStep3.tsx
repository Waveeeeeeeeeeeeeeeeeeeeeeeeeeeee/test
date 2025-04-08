import GamePadIco from '../assets/gamepad.svg?react'
import MeetIco from '../assets/meet.svg?react'
import { useMatchStore } from '../model/match'

import styles from './OnboardingStep3.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'

const OnboardingStep3 = () => {
	const { title, label1, label2, secLabel1, secLabel2 } =
		useCustomTranslation('onboardingStep3')
	const chooseVariant = [
		{ code: 'realLife', label: label1, flag: MeetIco, seclabel: secLabel1 },
		{ code: 'online', label: label2, flag: GamePadIco, seclabel: secLabel2 }
	]
	const { selectedMatchType, setMatchType } = useMatchStore()
	return (
		<div className='relative'>
			<h2 className={styles.title}>{title}</h2>
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

export default OnboardingStep3
