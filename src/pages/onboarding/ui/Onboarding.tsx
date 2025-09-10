import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { completeOnboarding } from '../lib/completeOnboarding';

import styles from './Onboarding.module.css';
import HeaderIco from '@/app/assets/images/header.svg?react';
import { useTelegram } from '@/entities/user/model/selectors';
import { useUserStore } from '@/entities/user/model/store';
import { Button, useCustomTranslation } from '@/shared';
import { AnimatedBlock } from '@/shared/ui/AnimatedBlock';
import {
	HeaderIcosChooseGame,
	HeaderIcosChooseLanguage,
	HeaderIcosChoosePlatform
} from '@/shared/ui/HeaderIcos/HeaderIcos';
import AccountInfoStep1 from '@/widgets/accountSteps/accountInfoStep1/ui/AccountInfoStep1';
import AccountInfoStep2 from '@/widgets/accountSteps/accountInfoStep2/ui/AccountInfoStep2';
import { OnboardingChooseGame } from '@/widgets/onboardingSteps';
import OnBoardingRules from '@/widgets/onboardingSteps/onBoardingRules/ui/OnBoardingRules';
import { OnboardingChooseLanguage } from '@/widgets/onboardingSteps/onboardingChooseLanguage/ui/OnboardingChooseLanguage';
import OnboardingChoosePerson from '@/widgets/onboardingSteps/onboardingChoosePerson/ui/OnboardingChoosePerson';
import { OnboardingChoosePlatform } from '@/widgets/onboardingSteps/onboardingChoosePlatform';

const maxSteps = 4;

export const Onboarding = () => {
	const location = useLocation();
	const initialSteps = (location.state?.steps as number) || 1;
	const [steps, setSteps] = useState(initialSteps);
	const { i18n } = useTranslation();
	const { backButton, nextButton } = useCustomTranslation('Onboarding');
	const { profile } = useUserStore();
	const isFirstFormValid = useUserStore(
		state => state.profile.isFirstFormValid
	);
	const selectedLanguage = useUserStore(
		state => state.profile.selectedLanguage
	);
	const [openRules, setOpenRules] = useState(false);
	const navigate = useNavigate();
	const telegram = useTelegram();

	const handleStepsPlusClick = async () => {
		if (steps === 1) {
			setOpenRules(true);
			return;
		} else if (steps === 13 && !profile.games.some(el => el.purposes)) {
			toast.error('Пожалуйста выберите игру');
			return;
		} else if (steps === 4 && !isFirstFormValid) {
			toast.error('Пожалуйста заполните все поля');
			return;
		}
		if (steps > maxSteps) {
			try {
				await completeOnboarding({
					...profile,
					serviceId: 1,
					telegramId: telegram?.id || 0
				});
				navigate('/');
			} catch (error) {
				console.error(error);
				toast.error('Ошибка при отправке данных');
			}
			return;
		}
		setSteps(prev => prev + 1);
	};

	const handleStepsMinusClick = () => {
		if (steps <= 1) return;
		setSteps(prev => prev - 1);
	};

	const handleResetSteps = () => {
		setSteps(1);
		setOpenRules(false);
	};

	const handleAccetpRules = () => {
		setSteps(2);
		setOpenRules(false);
	};

	const showIcos = (step: number) => {
		switch (step) {
			case 1:
				return <HeaderIcosChooseLanguage />;
			case 2:
				return <HeaderIcosChoosePlatform />;
			case 3:
				return <HeaderIcosChooseGame />;
			default:
				return null;
		}
	};

	const showActualOnboarding = (step: number) => {
		switch (step) {
			case 1:
				return <OnboardingChooseLanguage />;
			case 2:
				return <OnboardingChoosePlatform />;
			// case 3:
			// 	return <OnboardingChooseGame />;
			case 3:
				return <OnboardingChoosePerson />;
			case 4:
				return <AccountInfoStep1 />;
			case 5:
				return <AccountInfoStep2 />;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (i18n.language !== selectedLanguage) {
			i18n.changeLanguage(selectedLanguage);
		}
	}, [selectedLanguage, i18n.language, i18n]);
	return (
		<>
			<div
				className={clsx(
					'min-h-screen bg-[var(--bg)]  py-5 flex flex-col justify-between px-4',
					styles.onboarding
				)}
			>
				<motion.div
					className={`flex justify-center items-center gap-4 relative `}
					animate={{
						scale: steps >= 4 ? 0.45 : 1,
						height: steps >= 4 ? '105px' : 'auto'
					}}
					transition={{ duration: 0.6, ease: 'easeInOut' }}
				>
					{' '}
					<HeaderIco className='transition-all duration-700 ease-in-out w-[270px] h-[234px]' />
					{showIcos(steps)}
				</motion.div>
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
	);
};
