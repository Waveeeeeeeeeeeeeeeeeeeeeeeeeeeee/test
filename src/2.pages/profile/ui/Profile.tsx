import { useState } from 'react'

import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { ToggleTabs } from '@/6.shared/ui/ToggleTabs/ToggleTabs'
import { UserCard } from '@/6.shared/ui/UserCard/UserCard'

const Profile = () => {
	const [toggle, setToggle] = useState('description')
	const { profile, telegram } = useUserStore()
	const { description, games } = useCustomTranslation('profile')

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
	return (
		<div className={'p-4'}>
			<UserCard
				name={profile.nickname}
				age={+profile.age}
				gender={profile.gender || ''}
				city={profile.city}
				languages={profile.selectedLanguage}
				avatarUrl={profile.image || telegram?.photo_url || ''}
				icon='notification'
			/>
			<ToggleTabs
				options={profileOptions}
				active={toggle}
				onChange={setToggle}
				variant='base'
			/>
		</div>
	)
}

export default AnimatedPage(Profile)
