import styles from './ProfileGames.module.css';
import { useGamesWithPurposes } from '@/entities/game/model/useGamesWithPurposes';
import { useUserStore } from '@/entities/user/model/store';
import { Button, useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import { handleBack } from '@/shared/lib/navigation/handleBack';
import { useGameFilter } from '@/widgets/gameList/model/useGameFilter';
import { GameList } from '@/widgets/gameList/ui/GameList';
import { UserGameList } from '@/widgets/userGameList/ui/UserGameList';

const ProfileGames = () => {
	const { title, subtitle } = useCustomTranslation('profileGames');
	const { searchHolder } = useCustomTranslation('onboardingStep2');
	const { backBtn, saveBtn } = useCustomTranslation('profileSettings');
	const { search, onChange } = useGameFilter();
	const { games } = useGamesWithPurposes();
	const { profile, addGame, removeGame } = useUserStore();
	const selectedGameIds = profile.games.map(g => g.id);

	return (
		<>
			<div className='p-4 px-4 h-screen relative overflow-scroll pb-20 flex flex-col gap-7.5'>
				<NotificationHeaderFactory
					title={title}
					IsBack={true}
					notification={true}
				/>
				<UserGameList />
				<h3 className={styles.subtitle}>{subtitle}</h3>
				<GameList
					games={games}
					searchValue={search}
					onSearchChange={value =>
						onChange({
							target: { value }
						} as React.ChangeEvent<HTMLInputElement>)
					}
					selectedGameIds={selectedGameIds}
					onChangeSelectedGameIds={ids => {
						ids.forEach(id => {
							if (!profile.games.some(g => g.id === id)) {
								const game = games.find(g => g.id === id);
								if (game) addGame(game);
							}
						});

						profile.games.forEach(g => {
							if (!ids.includes(g.id)) {
								removeGame(g);
							}
						});
					}}
					allGameTitles={games.map(game => game.title)}
					searchPlaceholder={searchHolder}
				/>
			</div>

			<div className={`flex w-full gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={handleBack}>
					{backBtn}
				</Button>
				<Button variant='accept' onClick={handleBack}>
					{saveBtn}
				</Button>
			</div>
		</>
	);
};

export default AnimatedPage(ProfileGames);
