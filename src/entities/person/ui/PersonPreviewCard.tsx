import { FC } from 'react';

import { TPersonPreview } from '../types/PersonPreview.types';

import { PersonGamesSlider } from '@/features/personGamesSlider';
import { PersonGame } from '@/features/personGamesSlider/model/types';
import { ShowTags } from '@/features/showTags';
import catIco from '@/shared/assets/images/cat.webp';
import { useDescription } from '@/shared/lib/hooks/useDescription';
import Description from '@/shared/ui/Description/Description';
import { UserCard } from '@/shared/ui/UserCard/UserCard';

type Props = {
	person: TPersonPreview;
	games?: PersonGame[];
	style?: React.CSSProperties;
};

export const PersonPreviewCard: FC<Props> = ({ person, games, style }) => {
	const { displayText, setIsCuted } = useDescription({
		text: person.about,
		maxLength: 100
	});

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
				isOnline={person.isOnline}
			/>

			<div className='flex flex-col gap-4 px-3 '>
				{person.selectedMatchType === 'realLife' ? (
					<div className='font-medium text-[#8a8989]'>{`${person.country}, г. ${person.city}`}</div>
				) : null}
				<>
					{person.selectedMatchType === 'realLife' ? (
						<Description
							description={displayText}
							toggle={() => setIsCuted(prev => !prev)}
						/>
					) : (
						<div className='flex flex-col gap-2'>
							<h3 className='font-semibold text-lg'>Страны</h3>
							<ShowTags tags={person.selectedCountry ?? []} />
							<h3 className='font-semibold text-lg'>Цели игры</h3>
							<ShowTags tags={person.selectedGoal ?? []} />
							<h3 className='font-semibold text-lg'>
								Время основной активности
							</h3>
							<ShowTags tags={person.selectedPrime ?? []} />
						</div>
					)}
				</>

				{person.selectedMatchType === 'realLife' ? (
					<ShowTags tags={person.interests} />
				) : null}
			</div>
			{games?.length ? <PersonGamesSlider games={games} /> : null}
		</div>
	);
};
