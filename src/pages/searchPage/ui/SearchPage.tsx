import { useParams } from 'react-router';

import { mockGames } from '@/entities/game/api/mockGames';
import { mockUser } from '@/entities/person/api/mockUser';
import { searchList } from '@/entities/search/config/searchList';
import { SwipeCardDeck } from '@/features/swipeCardDeck/ui/SwipeCardDeck';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { useNotificationHeader } from '@/shared/lib/hooks/useNotificationHeader';
import { UserFiltersModal } from '@/widgets/userFiltersModal/ui/UserFiltersModal';
import UserListFilters from '@/widgets/userListFilters/ui/UserListFilters';
import { UserInteractionPanel } from '@/widgets/userPanel/ui/UserInteractionPanel';

const SearchPage = () => {
	const { searchType } = useParams<{ searchType: string }>();
	const card = searchList.find(item => item.href.endsWith(searchType || ''));
	// const users = useUserSocketStore(state => state.users);

	const { NotificationHeaderWrapper } = useNotificationHeader({
		title: card !== undefined ? card?.title : 'Режимы поиска',
		back: true,
		notification: true
	});

	if (!card) return <div>Ничего не найдено 😢</div>;
	return (
		<>
			<div className='p-4 px-4 h-[900px] mb-20 relative overflow-scoll pb-48'>
				<div className=' mb-2.5'>
					<NotificationHeaderWrapper />
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
