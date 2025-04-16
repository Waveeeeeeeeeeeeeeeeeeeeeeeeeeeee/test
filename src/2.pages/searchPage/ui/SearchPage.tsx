import { useParams } from 'react-router'

import { UserFiltersModal } from '@/3.widgets/userFiltersModal/ui/UserFiltersModal'
import UserListFilters from '@/3.widgets/userListFilters/ui/UserListFilters'
import { UserInteractionPanel } from '@/3.widgets/userPanel/ui/UserInteractionPanel'
import { PersonGamesSlider } from '@/4.features/personGamesSlider'
import { ShowInterests } from '@/4.features/showInterests'
import { searchList } from '@/5.entities/search/config/searchList'
import { useUserStore } from '@/5.entities/user/model/store'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import Description from '@/6.shared/ui/Description/Description'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'
import { UserCard } from '@/6.shared/ui/UserCard/UserCard'

const SearchPage = () => {
	const { searchType } = useParams<{ searchType: string }>()
	const card = searchList.find(item => item.href.endsWith(searchType || ''))
	const { profile, telegram } = useUserStore()

	const mockGames = [
		{
			id: '1',
			title: 'PUBG Mobile',
			iconUrl:
				'https://upload.wikimedia.org/wikipedia/ru/thumb/c/c9/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B8%D0%B3%D1%80%D1%8B_PlayerUnknown%27s_Battlegrounds.jpg/411px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B8%D0%B3%D1%80%D1%8B_PlayerUnknown%27s_Battlegrounds.jpg',
			level: 12,
			badgeLabel: 'Праки',
			infoImg:
				'https://upload.wikimedia.org/wikipedia/ru/thumb/c/c9/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B8%D0%B3%D1%80%D1%8B_PlayerUnknown%27s_Battlegrounds.jpg/411px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B8%D0%B3%D1%80%D1%8B_PlayerUnknown%27s_Battlegrounds.jpg',
			mode: 'Ranked',
			verify: true
		},
		{
			id: '2',
			title: 'Overwatch',
			iconUrl:
				'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
			level: 7,
			badgeLabel: 'Дуо',
			// infoImg:
			// 	'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
			mode: 'Unrated'
		}
	]

	const handleGoBack = () => {
		window.history.back()
	}

	if (!card) return <div>Ничего не найдено 😢</div>
	return (
		<>
			<div className='p-4 px-4 h-screen relative overflow-scroll pb-48'>
				<div className=' mb-2.5'>
					<NotificationHeader
						title={card.title}
						back={true}
						goBack={handleGoBack}
						notification
					/>
				</div>
				<div className=' mb-4'>
					<UserListFilters />
				</div>
				<div className='rounded-2xl bg-[var(--second-bg)] flex flex-col gap-4 px-1.5 pt-1.5'>
					<div>
						<UserCard
							name={profile.nickname}
							age={+profile.age}
							gender={profile.gender || ''}
							city={profile.city}
							languages={profile.selectedLanguage}
							avatarUrl={profile.image || telegram?.photo_url || ''}
							icon='info'
						/>
					</div>
					<div className='px-4'>
						<Description description={profile.about} variant='short' />
					</div>
					<ShowInterests interests={profile.interests} maxVisible={6} />
					<PersonGamesSlider games={mockGames} />
				</div>
				<UserInteractionPanel userId='123' />
			</div>
			<UserFiltersModal />
		</>
	)
}

export default AnimatedPage(SearchPage)
