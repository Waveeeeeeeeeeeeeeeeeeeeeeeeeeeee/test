import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { OnboardingChooseCountry } from '../../../widgets/onboardingSteps/onboardingChooseCountry/ui/OnboardingChooseCountry';
import { completeOnboarding } from '../lib/completeOnboarding';

import styles from './Onboarding.module.css';
import HeaderIco from '@/app/assets/images/header.svg?react';
import { useTelegram } from '@/entities/user/model/selectors';
import { useUserStore } from '@/entities/user/model/store';
import { Button, useCustomTranslation } from '@/shared';
import { axiosInstance } from '@/shared/api/axiosInstance';
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
import { TempRules } from '@/widgets/onboardingSteps/tempRules/ui/tempRules';

interface OnboardingProps {
	debugLog?: string;
}

export const Onboarding = ({ debugLog }: OnboardingProps) => {
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const { backButton, nextButton } = useCustomTranslation('Onboarding');
	const telegram = useTelegram();

	const { profile } = useUserStore();
	const selectedMatchType = useUserStore(
		state => state.profile.selectedMatchType
	);
	const selectedLanguage = useUserStore(
		state => state.profile.selectedLanguage
	);
	const country = useUserStore(state => state.profile.country);
	const city = useUserStore(state => state.profile.city);
	const choosedPlatform = useUserStore(state => state.profile.selectedPlatform);
	const isFirstFormValid = useUserStore(
		state => state.profile.isFirstFormValid
	);

	const [stepIndex, setStepIndex] = useState(0);
	const [openRules, setOpenRules] = useState(false);

	useEffect(() => {
		console.log('Onboarding useEffect: verify запрос начал выполняться');

		const logToDebug = (label: string, payload: unknown) => {
			try {
				const el = document.getElementById('debug-log');
				if (!el) {
					console.warn('debug-log element not found');
					return;
				}
				const block = document.createElement('div');
				block.style.marginBottom = '6px';
				const title = document.createElement('div');
				title.style.fontWeight = 'bold';
				title.textContent = label;
				const pre = document.createElement('pre');
				pre.style.whiteSpace = 'pre-wrap';
				pre.style.wordBreak = 'break-word';
				pre.textContent =
					typeof payload === 'string'
						? payload
						: JSON.stringify(payload, null, 2);
				block.appendChild(title);
				block.appendChild(pre);
				el.appendChild(block);
			} catch (e) {
				console.debug('debug-log error', e);
			}
		};

		(async () => {
			console.log('Onboarding: async функция запущена');
			try {
				const storeInitData = useUserStore.getState().telegramInitData;
				const windowInitData = (
					window as unknown as {
						Telegram?: { WebApp?: { initData?: string } };
					}
				).Telegram?.WebApp?.initData;
				const lsInitData = localStorage.getItem('debug_init_data');

				console.log('Onboarding: проверка initData источников', {
					storeInitData: !!storeInitData,
					windowInitData: !!windowInitData,
					lsInitData: !!lsInitData
				});

				const initDataHeader = storeInitData || windowInitData || lsInitData;

				let hash: string | null = null;
				if (initDataHeader) {
					try {
						if (initDataHeader.startsWith('{')) {
							const parsed = JSON.parse(initDataHeader);
							hash = parsed.hash || null;
						} else {
							const params = new URLSearchParams(initDataHeader);
							hash = params.get('hash');
						}
					} catch {
						console.log('полученный хэш: не удалось распарсить initData');
					}
				}

				if (hash) {
					console.log('полученный хэш:', hash);
				}

				if (!initDataHeader) {
					logToDebug(
						'verify: нет X-Telegram-Init-Data',
						'Добавь сырую initData в localStorage.debug_init_data'
					);
				} else {
					logToDebug('verify: отправляем X-Telegram-Init-Data', initDataHeader);
				}

				console.log('Onboarding: отправка verify запроса...');
				console.log(
					'Onboarding: initDataHeader длина',
					initDataHeader?.length || 0
				);

				if (initDataHeader && typeof initDataHeader !== 'string') {
					console.error(
						'Onboarding: initDataHeader не строка!',
						typeof initDataHeader,
						initDataHeader
					);
					logToDebug('verify: initDataHeader не строка', typeof initDataHeader);
					return;
				}

				const res = await axiosInstance.post('/auth/v1/telegram/verify', {});

				console.log('Onboarding: verify запрос успешен', res.data);
				console.log(
					'response.request.headers:',
					res.config.headers || res.request?.headers || {}
				);
				logToDebug('/auth/v1/telegram/verify: response', res.data ?? 'ok');
			} catch (err) {
				console.error('Onboarding: verify запрос ошибка', err);
				const axiosError = err as {
					response?: {
						config?: { headers?: unknown };
						data?: unknown;
						status?: number;
					};
					request?: { headers?: unknown };
				};
				if (
					axiosError?.response?.config?.headers ||
					axiosError?.request?.headers
				) {
					console.log(
						'response.request.headers (error):',
						axiosError.response?.config?.headers || axiosError.request?.headers
					);
				}
				if (axiosError?.response) {
					console.error(
						'Onboarding: response status:',
						axiosError.response.status
					);
					console.error('Onboarding: response data:', axiosError.response.data);
					logToDebug('/auth/v1/telegram/verify: error response', {
						status: axiosError.response.status,
						data: axiosError.response.data
					});
				}
				logToDebug(
					'/auth/v1/telegram/verify: error',
					(err as Error)?.message || err
				);
			}
		})();
	}, []);

	const stepsFlow =
		selectedMatchType === 'realLife'
			? [1, 2, 3, 4, 5]
			: [1, 2, 3, 4, 5, 6, 7, 8];

	const currentStep = stepsFlow[stepIndex];

	const handleNextStep = async () => {
		switch (currentStep) {
			case 1:
				setOpenRules(true);
				return;
			case 2:
				if (choosedPlatform.length === 0) {
					toast.error('Пожалуйста выберите платформу');
					return;
				}
				break;
			case 3:
				if (!profile.games.some(el => el.purposes)) {
					toast.error('Пожалуйста выберите игру');
					return;
				}
				break;
			case 4:
				if (selectedMatchType === 'realLife') {
					if (!country || !city) {
						toast.error('Пожалуйста заполните все поля');
						return;
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
					} catch {
						toast.error('Ошибка при проверке страны и города');
						return;
					}
				}
				break;
			case 5:
				if (selectedMatchType === 'realLife' && !isFirstFormValid) {
					toast.error('Пожалуйста заполните все поля');
					return;
				}
				if (
					selectedMatchType === 'online' &&
					profile.selectedCountry.length === 0
				) {
					toast.error('Введите как минимум одну страну');
					return;
				}
				break;
			case 6:
				if (
					selectedMatchType === 'online' &&
					profile.selectedGoal.length === 0
				) {
					toast.error('Выберите как минимум одну цель для игры');
					return;
				}
				break;
			case 7:
				if (
					selectedMatchType === 'online' &&
					profile.selectedPrime.length === 0
				) {
					toast.error('Выберите как минимум один временной отрезок');
					return;
				}
				break;
		}

		if (stepIndex >= stepsFlow.length - 1) {
			try {
				await completeOnboarding({
					...profile,
					serviceId: 1,
					telegramId: telegram?.id || 0
				});
				navigate('/profile');
			} catch {
				toast.error('Ошибка при отправке данных');
			}
			return;
		}

		setStepIndex(prev => prev + 1);
	};

	const handlePrevStep = () => {
		if (stepIndex === 0) return;
		setStepIndex(prev => prev - 1);
	};

	const handleResetSteps = () => {
		setStepIndex(0);
		setOpenRules(false);
	};

	const handleAcceptRules = () => {
		setStepIndex(1);
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
				return selectedMatchType === 'online' ? (
					<HeaderIcosChoosePlatform />
				) : null;
			case 7:
				return selectedMatchType === 'online' ? (
					<HeaderIcosChoosePrime />
				) : null;
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
				return selectedMatchType === 'online' ? <OnboardingChooseGoal /> : null;
			case 7:
				return selectedMatchType === 'online' ? (
					<OnboardingChoosePrime />
				) : null;
			case 8:
				return selectedMatchType === 'online' ? <OnboardingAboutMe /> : null;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (i18n.language !== selectedLanguage) {
			i18n.changeLanguage(selectedLanguage);
		}
	}, [selectedLanguage, i18n]);

	return (
		<>
			<div
				id='debug-log'
				style={{
					position: 'fixed',
					top: '0',
					left: '0',
					width: '100vw',
					height: '40vh',
					backgroundColor: 'rgba(0,0,0,0.9)',
					color: 'white',
					fontSize: '14px',
					padding: '20px',
					overflow: 'auto',
					zIndex: 9999,
					fontFamily: 'monospace'
				}}
			>
				<div
					style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
				>
					Debug Log:
				</div>
				{debugLog && (
					<div style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
						{debugLog}
					</div>
				)}
			</div>

			<div
				className={clsx(
					'min-h-screen bg-[var(--bg)]  py-5 flex flex-col justify-between px-4',
					styles.onboarding
				)}
			>
				<motion.div
					className='flex justify-center items-center gap-4 relative'
					animate={{
						scale: stepIndex >= 9 ? 0.45 : 1,
						height: stepIndex >= 9 ? '105px' : 'auto'
					}}
					transition={{ duration: 0.6, ease: 'easeInOut' }}
				>
					<HeaderIco className='transition-all duration-700 ease-in-out w-[270px] h-[234px]' />
					{showIcos(currentStep)}
				</motion.div>

				<div className='grow'>
					<AnimatedBlock key={currentStep}>
						{showActualOnboarding(currentStep)}
					</AnimatedBlock>
				</div>

				<div
					className={clsx(
						'flex justify-between p-3 items-center gap-4',
						styles.buttons
					)}
				>
					<Button variant='secondary' onClick={handlePrevStep}>
						{backButton}
					</Button>
					<Button variant='next' onClick={handleNextStep}>
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
						<TempRules
							handleAccetpRules={handleAcceptRules}
							handleResetSteps={handleResetSteps}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
