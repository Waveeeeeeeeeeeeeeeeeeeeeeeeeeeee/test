import { FC } from 'react'

import { UserProfile } from '@/entities/user/model/types'
import { PersonGamesSlider } from '@/features/personGamesSlider'
import { PersonGame } from '@/features/personGamesSlider/model/types'
import { ShowInterests } from '@/features/showInterests'
import catIco from '@/shared/assets/images/cat.webp'
import Description from '@/shared/ui/Description/Description'
import { UserCard } from '@/shared/ui/UserCard/UserCard'

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
				coutry_code={person.country_code}
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
