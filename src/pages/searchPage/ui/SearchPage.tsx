import { useParams } from 'react-router';

import { mockUser } from '@/entities/person/api/mockUser';
import { searchList } from '@/entities/search/config/searchList';
import { SwipeCardDeck } from '@/features/swipeCardDeck/ui/SwipeCardDeck';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeader } from '@/shared/ui/NotificationHeader';
import { UserFiltersModal } from '@/widgets/userFiltersModal/ui/UserFiltersModal';
import UserListFilters from '@/widgets/userListFilters/ui/UserListFilters';
import { UserInteractionPanel } from '@/widgets/userPanel/ui/UserInteractionPanel';

const SearchPage = () => {
	const { searchType } = useParams<{ searchType: string }>();
	const card = searchList.find(item => item.href.endsWith(searchType || ''));
	// const users = useUserSocketStore(state => state.users);

	const mockGames = [
		{
			id: '1',
			title: 'PUBG Mobile',
			iconUrl:
				'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PlayerUnknown%27s_Battlegrounds_Mobile.webp/240px-PlayerUnknown%27s_Battlegrounds_Mobile.webp.png',
			level: 12,
			badgeLabel: 'Праки',
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
			mode: 'Unrated',
			verify: true
		}
	];

	const handleGoBack = () => {
		window.history.back();
	};

	if (!card) return <div>Ничего не найдено 😢</div>;
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
				<SwipeCardDeck users={mockUser} games={mockGames} />

				<UserInteractionPanel userId='123' />
			</div>

			<UserFiltersModal />
		</>
	);
};

export default AnimatedPage(SearchPage);
