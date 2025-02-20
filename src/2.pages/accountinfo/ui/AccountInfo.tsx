import { useState } from 'react'
import { useNavigate } from 'react-router'

import styles from './AccountInfo.module.css'
import AccountInfoStep1 from '@/3.widgets/accountInfoStep1/ui/AccountInfoStep1'
import AccountInfoStep2 from '@/3.widgets/accountInfoStep2/ui/AccountInfoStep2'
import AccountInfoStep3 from '@/3.widgets/accountInfoStep3/ui/AccountInfoStep3'
import { Button, useCustomTranslation } from '@/6.shared'
import { AnimatedBlock } from '@/6.shared/ui/AnimatedBlock'
import { Progress } from '@/6.shared/ui/Progress'

const totalSteps = 3

export const AccountInfo = () => {
	const [steps, setSteps] = useState(1)
	const { backButton, nextButton } = useCustomTranslation('accountInfo')
	const navigate = useNavigate()
	const handleStepsPlusClick = () => {
		if (steps >= totalSteps) {
			return
		}
		setSteps(prev => prev + 1)
	}

	const handleStepsMinusClick = () => {
		if (steps <= 1) {
			navigate('/', { state: { steps: totalSteps } })
			return
		}
		setSteps(prev => prev - 1)
	}
	const showActualOnboarding = (step: number) => {
		switch (step) {
			case 1:
				return <AccountInfoStep1 />
			case 2:
				return <AccountInfoStep2 />
			case 3:
				return <AccountInfoStep3 />
			default:
				return null
		}
	}

	return (
		<div className='min-h-screen bg-[var(--grey-dark)] px-4 py-5 flex flex-col justify-between'>
			<div className='flex justify-center items-center gap-4 mb-5'>
				<span className={styles.stepsCount}>
					{steps}/{totalSteps}
				</span>
				<Progress currentStep={steps} totalSteps={totalSteps} />
			</div>
			<div className='grow'>
				<AnimatedBlock key={steps}>{showActualOnboarding(steps)}</AnimatedBlock>
			</div>
			<div className='flex justify-between items-center gap-4'>
				<Button variant='secondary' onClick={handleStepsMinusClick}>
					{backButton}
				</Button>
				<Button variant='next' onClick={handleStepsPlusClick}>
					{nextButton}
				</Button>
			</div>
		</div>
	)
}
