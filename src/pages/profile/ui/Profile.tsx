import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useUserStore } from '@/entities/user/model/store';
import ProfileMenu from '@/features/profileMenu/ui/ProfileMenu';
import { ShowInterests } from '@/features/showInterests';
import { useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import Description from '@/shared/ui/Description/Description';
import { ToggleTabs } from '@/shared/ui/ToggleTabs/ToggleTabs';
import { UserCard } from '@/shared/ui/UserCard/UserCard';
import { useRulesToggle } from '@/widgets/onboardingSteps/model/toggleRules';
import { OnboardingRules } from '@/widgets/onboardingSteps/tempRules/ui/OnboardingRules';

const Profile = () => {
	const [toggle, setToggle] = useState('description');
	const { profile, telegram } = useUserStore();
	const { description, games } = useCustomTranslation('profile');
	const { isOpen, close } = useRulesToggle();
	const profileOptions = [
		{
			label: description,
			value: 'description'
		},
		{
			label: games,
			value: 'games'
		}
	];

	console.log(profile);
	return (
		<div className={'px-4 pt-4 pb-28 flex flex-col gap-7.5'}>
			<UserCard
				name={profile.nickname}
				age={+profile.age}
				gender={profile.gender || ''}
				city={profile.city}
				languages={profile.selectedLanguage}
				avatarUrl={profile.image || telegram?.photo_url || ''}
				coutry_code={profile.country_code}
				icon='notification'
			/>
			<div className='flex flex-col gap-4 border-b-[1px] border-[#40434f] pb-7.5 mt-5'>
				<div className='h-[47px]'>
					<ToggleTabs
						options={profileOptions}
						active={toggle}
						onChange={setToggle}
						variant='base'
					/>
				</div>
				<Description description={profile.about} variant='full' />
				<ShowInterests interests={profile.interests} />
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
						<OnboardingRules handleAccetpRules={close} profile />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AnimatedPage(Profile);
