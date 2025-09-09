import { useParams } from 'react-router'

// import { mockUsers } from '@/5.entities/person/config/testUsers'
import { useUserSocketStore } from '@/entities/person/model/userSocketStore'
import { searchList } from '@/entities/search/config/searchList'
import { SwipeCardDeck } from '@/features/swipeCardDeck/ui/SwipeCardDeck'
import { AnimatedPage } from '@/shared/hoc/AnimatedPage'
import { NotificationHeader } from '@/shared/ui/NotificationHeader'
import { UserFiltersModal } from '@/widgets/userFiltersModal/ui/UserFiltersModal'
import UserListFilters from '@/widgets/userListFilters/ui/UserListFilters'
import { UserInteractionPanel } from '@/widgets/userPanel/ui/UserInteractionPanel'

const SearchPage = () => {
	const { searchType } = useParams<{ searchType: string }>()
	const card = searchList.find(item => item.href.endsWith(searchType || ''))
	const users = useUserSocketStore(state => state.users)

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
				<SwipeCardDeck users={users} games={mockGames} />
				<UserInteractionPanel userId='123' />
			</div>
			<UserFiltersModal />
		</>
	)
}

export default AnimatedPage(SearchPage)
