import styles from './OnBoardingRules.module.css'
import { Button, useCustomTranslation } from '@/6.shared'
import { NumericList } from '@/6.shared/ui/NumericList'

const link = { href: '#', text: 'Boost Ace', position: 0 }

interface OnBoardingRulesProps {
	handleResetSteps: () => void
	handleAccetpRules: () => void
}
const OnBoardingRules = ({
	handleResetSteps,
	handleAccetpRules
}: OnBoardingRulesProps) => {
	const { title, numeric1, numeric2, numeric3, button, declineButton } =
		useCustomTranslation('onBoardingRules')

	return (
		<div className={styles.rules}>
			<div className='flex items-center justify-center mb-5'>
				<h2 className={styles.title}>{title}</h2>
			</div>
			<NumericList data={[numeric1, numeric2, numeric3]} link={link} />
			<div className='flex gap-2.5 w-full mt-13'>
				<Button size='large' variant='secondary' onClick={handleResetSteps}>
					{declineButton}
				</Button>
				<Button size='large' variant='next' onClick={handleAccetpRules}>
					{button}
				</Button>
			</div>
		</div>
	)
}

export default OnBoardingRules
