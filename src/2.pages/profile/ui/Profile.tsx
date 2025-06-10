import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { useRulesToggle } from '@/3.widgets/onboardingSteps/model/toggleRules'
import OnBoardingRules from '@/3.widgets/onboardingSteps/onBoardingRules/ui/OnBoardingRules'
import ProfileMenu from '@/4.features/profileMenu/ui/ProfileMenu'
import { ShowInterests } from '@/4.features/showInterests'
import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import Description from '@/6.shared/ui/Description/Description'
import { ToggleTabs } from '@/6.shared/ui/ToggleTabs/ToggleTabs'
import { UserCard } from '@/6.shared/ui/UserCard/UserCard'

const Profile = () => {
	const [toggle, setToggle] = useState('description')
	const { profile, telegram } = useUserStore()
	const { description, games } = useCustomTranslation('profile')
	const { isOpen, close } = useRulesToggle()
	const profileOptions = [
		{
			label: description,
			value: 'description'
		},
		{
			label: games,
			value: 'games'
		}
	]

	console.log(profile)
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
						<OnBoardingRules handleAccetpRules={close} profile />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AnimatedPage(Profile)
