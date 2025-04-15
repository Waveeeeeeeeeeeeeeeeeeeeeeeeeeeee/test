import { useUserStore } from '@/5.entities/user/model/store'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { UserCard } from '@/6.shared/ui/UserCard/UserCard'

const Profile = () => {
	const { profile, telegram } = useUserStore()

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
		</div>
	)
}

export default AnimatedPage(Profile)
