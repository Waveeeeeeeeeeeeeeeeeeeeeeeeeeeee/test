import { FC } from 'react'

import catIco from '../../../6.shared/assets/images/cat.webp'

import { PersonGamesSlider } from '@/4.features/personGamesSlider'
import { PersonGame } from '@/4.features/personGamesSlider/model/types'
import { ShowInterests } from '@/4.features/showInterests'
import { UserProfile } from '@/5.entities/user/model/types'
import Description from '@/6.shared/ui/Description/Description'
import { UserCard } from '@/6.shared/ui/UserCard/UserCard'

type Props = {
	person: UserProfile
	games?: PersonGame[]
	style?: React.CSSProperties
}

export const PersonPreviewCard: FC<Props> = ({ person, games, style }) => {
	return (
		<div
			className='rounded-2xl bg-[var(--second-bg)] flex flex-col gap-4 px-1.5 pt-1.5 realative'
			style={style}
		>
			<UserCard
				name={person.nickname}
				age={+person.age}
				gender={person.gender || ''}
				city={person.city}
				languages={person.selectedLanguage}
				avatarUrl={person.image || catIco}
				icon='info'
			/>
			<div className='px-4'>
				<Description description={person.about} variant='short' />
			</div>
			<ShowInterests interests={person.interests} maxVisible={6} />
			{games?.length ? <PersonGamesSlider games={games} /> : null}
		</div>
	)
}
