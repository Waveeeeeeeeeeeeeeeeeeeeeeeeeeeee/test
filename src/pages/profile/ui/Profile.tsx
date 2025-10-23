import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { mockUser } from '@/entities/person/api/mockUser';
import { useUserStore } from '@/entities/user/model/store';
import ProfileMenu from '@/features/profileMenu/ui/ProfileMenu';
import { ShowTags } from '@/features/showTags';
import { useCustomTranslation } from '@/shared';
import EditIco from '@/shared/assets/icons/edit.svg?react';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { useTranslateTags } from '@/shared/lib/translateTags';
import Description from '@/shared/ui/Description/Description';
import { ToggleTabs } from '@/shared/ui/ToggleTabs/ToggleTabs';
import { UserCard } from '@/shared/ui/UserCard/UserCard';
import { useRulesToggle } from '@/widgets/onboardingSteps/model/toggleRules';
import { TempRules } from '@/widgets/onboardingSteps/tempRules/ui/tempRules';

type matchType = 'online' | 'realLife';

const Profile = () => {
	const { profile, setProfileField } = useUserStore();
	const {
		online,
		realLife,
		statusLabel,
		countriesLabel,
		goalsLabel,
		activityTimeLabel,
		editButton
	} = useCustomTranslation('profile');
	const { translateTags } = useTranslateTags();
	const { isOpen, close } = useRulesToggle();
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
	const navigate = useNavigate();

	const handleEdit = useCallback(
		({ matchType }: { matchType: matchType }) => {
			navigate(`/profile/info/${matchType}`);
		},
		[navigate]
	);

	const setToggle = useCallback(() => {
		setProfileField(
			'selectedMatchType',
			profile.selectedMatchType === 'realLife' ? 'online' : 'realLife'
		);
	}, [setProfileField, profile.selectedMatchType]);

	const profileOptions = [
		{
			label: online,
			value: 'online'
		},
		{
			label: realLife,
			value: 'realLife'
		}
	];

	return (
		<div className={'px-4 pt-4 pb-28 flex flex-col gap-7.5'}>
			<UserCard
				name={mockUser[0].nickname}
				age={+mockUser[0].age}
				gender={mockUser[0].gender || ''}
				languages={mockUser[0].selectedLanguage}
				avatarUrl={mockUser[0].image || ''}
				coutry_code={mockUser[0].country_code}
				icon='notification'
			/>
			<div className='flex flex-col gap-4 border-b-[1px] border-[#40434f] pb-7.5 mt-2'>
				<div className='h-[47px] mb-10'>
					<h2 className='text-xl font-semibold mb-3'>{statusLabel}</h2>
					<ToggleTabs
						options={profileOptions}
						active={profile.selectedMatchType}
						onChange={setToggle}
						variant='accent'
					/>
				</div>

				{profile.selectedMatchType === 'realLife' ? (
					<Description
						description={
							isDescriptionExpanded
								? mockUser[0].about
								: mockUser[0].about.slice(0, 100)
						}
						showMoreButton={
							!isDescriptionExpanded && mockUser[0].about.length > 100
						}
						showHideButton={
							isDescriptionExpanded && mockUser[0].about.length > 100
						}
						toggle={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
					/>
				) : (
					<div>
						<h2 className='text-xl font-semibold mb-3'>{countriesLabel}</h2>
						<ShowTags
							tags={
								mockUser[0].selectedCountry !== undefined
									? translateTags(mockUser[0].selectedCountry)
									: []
							}
						/>
					</div>
				)}
				{profile.selectedMatchType === 'realLife' ? (
					<ShowTags tags={translateTags(mockUser[0].interests)} />
				) : (
					<div>
						<h2 className='text-xl font-semibold mb-3'>{goalsLabel}</h2>
						<ShowTags tags={translateTags(mockUser[0].selectedGoal ?? [])} />
					</div>
				)}
				{profile.selectedMatchType === 'realLife' ? (
					<div>
						<span className='text-sm text-gray-400'>
							{mockUser[0].country} {'г.' + mockUser[0].city}
						</span>
					</div>
				) : (
					<div>
						<h2 className='text-xl font-semibold mb-3'>{activityTimeLabel}</h2>
						<ShowTags tags={translateTags(mockUser[0].selectedPrime ?? [])} />
					</div>
				)}

				<button
					className='text-sm border-[1px] bg-[#18181B] border-none rounded-3xl py-3 flex flex-row items-center justify-center gap-2 cursor-pointer'
					onClick={() =>
						handleEdit({ matchType: profile.selectedMatchType as matchType })
					}
				>
					<span className='font-semibold text-sm'>{editButton}</span>
					<span>
						<EditIco />
					</span>
				</button>
			</div>
			<ProfileMenu />

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key='onboarding-rules'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
					>
						<TempRules handleAccetpRules={close} profile />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AnimatedPage(Profile);
