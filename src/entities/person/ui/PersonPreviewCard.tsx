import { FC } from 'react';

import { UserProfile } from '@/entities/user/model/types';
import { PersonGamesSlider } from '@/features/personGamesSlider';
import { PersonGame } from '@/features/personGamesSlider/model/types';
import { ShowInterests } from '@/features/showInterests';
import catIco from '@/shared/assets/images/cat.webp';
import Description from '@/shared/ui/Description/Description';
import { UserCard } from '@/shared/ui/UserCard/UserCard';

type PersonPreview = Pick<
	UserProfile,
	'nickname' | 'image' | 'country_code' | 'age' | 'interests' | 'about'
> &
	Partial<UserProfile>;

type Props = {
	person: PersonPreview;
	games?: PersonGame[];
	style?: React.CSSProperties;
};

export const PersonPreviewCard: FC<Props> = ({ person, games, style }) => {
	return (
		<div
			className='rounded-2xl bg-[var(--second-bg)] flex flex-col gap-4 px-1.5 pt-1.5 relative '
			style={style}
		>
			<UserCard
				name={person.nickname}
				age={+person.age}
				gender={person.gender || ''}
				city=''
				languages={person.selectedLanguage}
				avatarUrl={person.image || catIco}
				coutry_code={person.country_code}
				icon='info'
			/>
			<div className='font-medium text-[#8a8989]'>{`${person.country}, г. ${person.city}`}</div>
			<div>
				<Description description={person.about} variant='short' />
			</div>
			<ShowInterests interests={person.interests} maxVisible={6} />
			{games?.length ? <PersonGamesSlider games={games} /> : null}
		</div>
	);
};
