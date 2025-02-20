import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import styles from './Onboarding.module.css'
import OnBoardingRules from '@/3.widgets/onBoardingRules/ui/OnBoardingRules'
import { OnboardingStep1 } from '@/3.widgets/onboardingStep1'
import { useLanguageStore } from '@/3.widgets/onboardingStep1/model/language'
import OnboardingStep2 from '@/3.widgets/onboardingStep2/ui/OnboardingStep2'
import { OnboardingStep3 } from '@/3.widgets/onboardingStep3'
import { Button, useCustomTranslation } from '@/6.shared'
import { AnimatedBlock } from '@/6.shared/ui/AnimatedBlock'
import { Progress } from '@/6.shared/ui/Progress'

const totalSteps = 3

export const Onboarding = () => {
	const location = useLocation()
	const initialSteps = (location.state?.steps as number) || 1
	const [steps, setSteps] = useState(initialSteps)
	const { i18n } = useTranslation()
	const { backButton, nextButton } = useCustomTranslation('Onboarding')
	const { selectedLanguage } = useLanguageStore()
	const [openRules, setOpenRules] = useState(false)

	const handleStepsPlusClick = () => {
		if (steps >= totalSteps) {
			setOpenRules(true)
			return
		}
		setSteps(prev => prev + 1)
	}

	const handleStepsMinusClick = () => {
		if (steps <= 1) return
		setSteps(prev => prev - 1)
	}

	const handleResetSteps = () => {
		setSteps(1)
		setOpenRules(false)
	}

	const showActualOnboarding = (step: number) => {
		switch (step) {
			case 1:
				return <OnboardingStep1 />
			case 2:
				return <OnboardingStep2 />
			case 3:
				return <OnboardingStep3 />
			default:
				return null
		}
	}

	useEffect(() => {
		i18n.changeLanguage(selectedLanguage)
	}, [selectedLanguage])

	return (
		<>
			<div className='min-h-screen bg-[var(--grey-dark)] px-4 py-5 flex flex-col justify-between'>
				<div className='flex justify-center items-center gap-4 mb-5'>
					<span className={styles.stepsCount}>
						{steps}/{totalSteps}
					</span>
					<Progress currentStep={steps} totalSteps={totalSteps} />
				</div>
				<div className='grow'>
					<AnimatedBlock key={steps}>
						{showActualOnboarding(steps)}
					</AnimatedBlock>
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
			<AnimatePresence>
				{openRules && (
					<motion.div
						key='onboarding-rules'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='fixed inset-0 flex items-center justify-center bg-black/50'
					>
						<OnBoardingRules
							close={() => setOpenRules(false)}
							handleResetSteps={handleResetSteps}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
