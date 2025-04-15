import GamePadIco from '../assets/gamepad.svg?react'
import MeetIco from '../assets/meet.svg?react'

import styles from './OnboardingStep3.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'

const OnboardingStep3 = () => {
	const { title, label1, label2, secLabel1, secLabel2 } =
		useCustomTranslation('onboardingStep3')

	const chooseVariant = [
		{ code: 'realLife', label: label1, flag: MeetIco, seclabel: secLabel1 },
		{ code: 'online', label: label2, flag: GamePadIco, seclabel: secLabel2 }
	]

	const selectedMatchType = useUserStore(
		state => state.profile.selectedMatchType
	)
	const setProfileField = useUserStore(state => state.setProfileField)

	const handleMatchTypeChange = (type: string) => {
		setProfileField('selectedMatchType', type)
	}

	return (
		<div className='relative'>
			<h2 className={styles.title}>{title}</h2>
			<div className='mt-6'>
				<VariantSelection
					data={chooseVariant}
					selected={selectedMatchType}
					onSelect={handleMatchTypeChange}
				/>
			</div>
		</div>
	)
}

export default OnboardingStep3
