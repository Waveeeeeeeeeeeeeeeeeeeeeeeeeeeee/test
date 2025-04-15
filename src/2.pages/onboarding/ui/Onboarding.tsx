import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import styles from './Onboarding.module.css'
import HeaderIco from '@/1.app/assets/images/header.svg?react'
import AccountInfoStep1 from '@/3.widgets/accountSteps/accountInfoStep1/ui/AccountInfoStep1'
import AccountInfoStep2 from '@/3.widgets/accountSteps/accountInfoStep2/ui/AccountInfoStep2'
import { OnboardingStep2 } from '@/3.widgets/onboardingSteps'
import OnBoardingRules from '@/3.widgets/onboardingSteps/onBoardingRules/ui/OnBoardingRules'
import { OnboardingStep1 } from '@/3.widgets/onboardingSteps/onboardingStep1'
import OnboardingStep3 from '@/3.widgets/onboardingSteps/onboardingStep3/ui/OnboardingStep3'
import { useUserStore } from '@/5.entities/user/model/store'
import { Button, useCustomTranslation } from '@/6.shared'
import { AnimatedBlock } from '@/6.shared/ui/AnimatedBlock'
import {
	HeaderIcos1Step,
	HeaderIcos2Step,
	HeaderIcos3Step
} from '@/6.shared/ui/HeaderIcos/HeaderIcos'

let maxSteps = 4

export const Onboarding = () => {
	const location = useLocation()
	const initialSteps = (location.state?.steps as number) || 1
	const [steps, setSteps] = useState(initialSteps)
	const { i18n } = useTranslation()
	const { backButton, nextButton } = useCustomTranslation('Onboarding')
	const selectedLanguage = useUserStore(state => state.profile.selectedLanguage)
	const [openRules, setOpenRules] = useState(false)
	const navigate = useNavigate()

	const handleStepsPlusClick = () => {
		if (steps === 1) {
			setOpenRules(true)
			return
		}
		if (steps > maxSteps) {
			navigate('/')
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

	const handleAccetpRules = () => {
		setSteps(2)
		setOpenRules(false)
	}

	const showIcos = (step: number) => {
		switch (step) {
			case 1:
				return <HeaderIcos1Step />
			case 2:
				return <HeaderIcos2Step />
			case 3:
				return <HeaderIcos3Step />
			default:
				return null
		}
	}

	const showActualOnboarding = (step: number) => {
		switch (step) {
			case 1:
				return <OnboardingStep1 />
			case 2:
				return <OnboardingStep2 />
			case 3:
				return <OnboardingStep3 />
			case 4:
				return <AccountInfoStep1 />
			case 5:
				return <AccountInfoStep2 />
			default:
				return null
		}
	}

	useEffect(() => {
		if (i18n.language !== selectedLanguage) {
			i18n.changeLanguage(selectedLanguage)
		}
	}, [selectedLanguage, i18n.language])
	return (
		<>
			<div
				className={clsx(
					'min-h-screen bg-[var(--bg)]  py-5 flex flex-col justify-between px-4',
					styles.onboarding
				)}
			>
				<div className={`flex justify-center items-center gap-4 relative`}>
					{' '}
					<HeaderIco
						className={'transition-all duration-700 ease-in-out'}
						width={steps >= 4 ? 110 : 270}
						height={steps >= 4 ? 110 : 234}
					/>
					{showIcos(steps)}
				</div>
				<div className='grow'>
					<AnimatedBlock key={steps}>
						{showActualOnboarding(steps)}
					</AnimatedBlock>
				</div>
				<div
					className={clsx(
						'flex justify-between p-3 items-center gap-4',
						styles.buttons
					)}
				>
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
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
					>
						<OnBoardingRules
							handleAccetpRules={handleAccetpRules}
							handleResetSteps={handleResetSteps}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
