import { useEffect } from 'react';

import styles from './UserFilterModal.module.css';
import { Game } from '@/entities/game/model/types';
import { useGamesWithPurposes } from '@/entities/game/model/useGamesWithPurposes';
import { useUserSocketStore } from '@/entities/person/model/userSocketStore';
import { UserProfile } from '@/entities/user/model/types';
import { useUserFiltersStore } from '@/features/userFilters/model/useUserFiltersStore';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { Button, useCustomTranslation } from '@/shared';
import {
	initSocket,
	sendFindRequest,
	subscribeToSocketMessages
} from '@/shared/socket/socketClient';
import { Modal } from '@/shared/ui/Modal/Modal';
import { NotificationHeader } from '@/shared/ui/NotificationHeader';
import { useGameFilter } from '@/widgets/gameList/model/useGameFilter';
import { GameList } from '@/widgets/gameList/ui/GameList';
import { useUserFiltersToggleStore } from '@/widgets/userListFilters/model/toggleUserFilter';

export const UserFiltersModal = () => {
	const {
		gender,
		setGender,
		scope,
		setScope,
		selectedGames,
		toggleSelectedGames
	} = useUserFiltersStore();

	const {
		scope1,
		scope2,
		scope3,
		button1,
		button2,
		mainTitle,
		subtitle1,
		subtitle2,
		subtitle3,
		backButton,
		acceptButton
	} = useCustomTranslation('userFiltersModal');
	const genders = [
		{ code: 'MALE', label: button1 },
		{ code: 'FEMALE', label: button2 }
	];

	useEffect(() => {
		initSocket('wss://api.acetest.site/dating/profiles/ws', {
			token: '1234567890',
			version: '1'
		});
		subscribeToSocketMessages<{ users: UserProfile[] }>(data => {
			console.log('Callback received socket data:', data);

			if (data.cmd === 'find' && data.payload?.users) {
				useUserSocketStore.getState().setUsers(data.payload.users);
			}
		});
	}, []);
	const handleSearch = () => {
		sendFindRequest({
			gender: 'MALE',
			age: '14',
			// scope,
			// games: selectedGames,
			country_code: 'RU'
		});

		close();
	};

	const scopes = [
		{
			code: 'city',
			label: scope1
		},
		{
			code: 'country',
			label: scope2
		},
		{
			code: 'world',
			label: scope3
		}
	];
	const { isOpen, close } = useUserFiltersToggleStore();
	const { search, onChange } = useGameFilter();
	const { games } = useGamesWithPurposes();
	const handleToggle = (game: Game) => {
		toggleSelectedGames(game.id);
	};
	return (
		<Modal isOpen={isOpen}>
			<div className='mb-5'>
				<NotificationHeader
					title={mainTitle}
					back
					goBack={close}
					notification={false}
				/>
			</div>
			<div className='flex flex-col gap-7 pb-20'>
				<div>
					<h3 className={`mb-2.5 ${styles.title}`}>{subtitle1}</h3>
					<GameList
						games={games}
						searchValue={search}
						onSearchChange={value =>
							onChange({
								target: { value }
							} as React.ChangeEvent<HTMLInputElement>)
						}
						onToggle={handleToggle}
						selectedGameIds={selectedGames}
						allGameTitles={games.map(game => game.title)}
						searchPlaceholder='Поиск'
						withTargetSelector={false}
						onTogglePurpose={undefined}
					/>
				</div>
				<div className='flex flex-col gap-2 mt-6'>
					<h3 className={`mb-2.5 ${styles.title}`}>{subtitle2}</h3>
					<VariantSelection
						variant='row'
						data={genders}
						selected={gender || 'men'}
						onSelect={setGender}
					/>
				</div>

				<div>
					<h3 className='text-xl font-bold mt-6 mb-2'>{subtitle3}</h3>
					<VariantSelection
						variant='col'
						data={scopes}
						selected={scope || 'city'}
						onSelect={setScope}
					/>
				</div>
			</div>
			<div className={`flex gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={close}>
					{backButton}
				</Button>
				<Button variant='accept' onClick={handleSearch}>
					{acceptButton}
				</Button>
			</div>
		</Modal>
	);
};
