import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { OnboardingChooseCountry } from '../../../widgets/onboardingSteps/onboardingChooseCountry/ui/OnboardingChooseCountry';
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
	HeaderIcosChoosePlatform,
	HeaderIcosChoosePrime
} from '@/shared/ui/HeaderIcos/HeaderIcos';
import { OnboardingChooseGame } from '@/widgets/onboardingSteps';
import OnboardingAboutMe from '@/widgets/onboardingSteps/onboardingAboutMe/ui/OnboardingAboutMe';
import { OnboardingChooseGoal } from '@/widgets/onboardingSteps/onboardingChooseGoal';
import { OnboardingChooseLanguage } from '@/widgets/onboardingSteps/onboardingChooseLanguage/ui/OnboardingChooseLanguage';
import { validateLocation } from '@/widgets/onboardingSteps/onboardingChoosePerson/api/validateLocation';
import OnboardingChoosePerson from '@/widgets/onboardingSteps/onboardingChoosePerson/ui/OnboardingChoosePerson';
import { OnboardingChoosePlatform } from '@/widgets/onboardingSteps/onboardingChoosePlatform';
import { OnboardingChoosePrime } from '@/widgets/onboardingSteps/onboardingChoosePrime';
import { OnboardingRules } from '@/widgets/onboardingSteps/onboardingRules/ui/OnboardingRules';

const maxSteps = 8;

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

	const country = useUserStore(state => state.profile.country);
	const city = useUserStore(state => state.profile.city);
	const selectedMatchType = useUserStore(
		state => state.profile.selectedMatchType
	);

	const choosedPlatform = useUserStore(state => state.profile.selectedPlatform);

	const [openRules, setOpenRules] = useState(false);
	const navigate = useNavigate();
	const telegram = useTelegram();

	const handleStepsPlusClick = async () => {
		if (steps === 1) {
			setOpenRules(true);
			return;
		}

		if (steps === 2) {
			if (choosedPlatform.length === 0) {
				toast.error('Пожалуйста выберите платформу');
				return;
			}
		}

		if (steps === 3 && !profile.games.some(el => el.purposes)) {
			toast.error('Пожалуйста выберите игру');
			return;
		}

		if (steps === 4) {
			if (selectedMatchType === 'realLife') {
				if (!country || !city) {
					toast.error('Пожалуйста заполните все поля');
					return;
				}
			}

			try {
				const response = await validateLocation({
					country_name: country,
					city_name: city
				});

				if (!response.data || response.data.detail === 'Empty response') {
					toast.error('Неверная страна или город');
					return;
				}
			} catch (err) {
				console.error(err);
				toast.error('Ошибка при проверке страны и города');
				return;
			}
		}

		if (steps === 5 && !isFirstFormValid && selectedMatchType === 'realLife') {
			toast.error('Пожалуйста заполните все поля');
			return;
		}

		if (steps === 5 && selectedMatchType === 'online') {
			if (profile.selectedCountry.length === 0) {
				toast.error('Введите как минимум одну страну');
				return;
			}
		}

		if (steps === 6 && selectedMatchType === 'online') {
			if (profile.selectedGoal.length === 0) {
				toast.error('Выберите как минимум одну цель для игры');
				return;
			}
		}

		if (steps === 7 && selectedMatchType === 'online') {
			if (profile.selectedPrime.length === 0) {
				toast.error('Выберите как минимум один временной отрезок');
				return;
			}
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
			case 4:
				return <HeaderIcosChoosePlatform />;
			case 5:
				return selectedMatchType === 'realLife' ? (
					<HeaderIcosChoosePlatform />
				) : (
					<HeaderIcosChooseLanguage />
				);
			case 6:
				if (selectedMatchType === 'online') {
					return <HeaderIcosChoosePlatform />;
				}
				return null;
			case 7:
				if (selectedMatchType === 'online') {
					return <HeaderIcosChoosePrime />;
				}
				return null;
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
			case 3:
				return <OnboardingChooseGame />;
			case 4:
				return <OnboardingChoosePerson />;
			case 5:
				return selectedMatchType === 'realLife' ? (
					<OnboardingAboutMe />
				) : (
					<OnboardingChooseCountry />
				);

			case 6:
				if (selectedMatchType === 'online') {
					return <OnboardingChooseGoal />;
				}
				return null;
			case 7:
				if (selectedMatchType === 'online') {
					return <OnboardingChoosePrime />;
				}
				return null;
			case 8:
				if (selectedMatchType === 'online') {
					return <OnboardingAboutMe />;
				}
				return null;

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
						scale: steps >= 9 ? 0.45 : 1,
						height: steps >= 9 ? '105px' : 'auto'
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
						<OnboardingRules
							handleAccetpRules={handleAccetpRules}
							handleResetSteps={handleResetSteps}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
