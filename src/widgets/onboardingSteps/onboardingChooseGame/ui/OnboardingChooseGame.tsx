import styles from './OnboardingChooseGame.module.css';
import { useGamesWithPurposes } from '@/entities/game/model/useGamesWithPurposes';
import { useUserStore } from '@/entities/user/model/store';
import { useCustomTranslation } from '@/shared';
import { useGameFilter } from '@/widgets/gameList/model/useGameFilter';
import { GameList } from '@/widgets/gameList/ui/GameList';

export const OnboardingChooseGame = () => {
	const { title, searchHolder } = useCustomTranslation('onboardingChooseGame');

	const { search, onChange } = useGameFilter();
	const { profile, addGame, removeGame } = useUserStore();
	const { games } = useGamesWithPurposes();

	const selectedGameIds = profile.games.map(g => g.id);

	return (
		<div className='relative flex flex-col gap-7 pb-20'>
			<h2 className={styles.title}>{title}</h2>
			<GameList
				games={games}
				searchValue={search}
				onSearchChange={value =>
					onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
				}
				selectedGameIds={selectedGameIds}
				onChangeSelectedGameIds={ids => {
					const currentlySelected = profile.games.map(g => g.id);

					ids.forEach(id => {
						if (!currentlySelected.includes(id)) {
							const gameToAdd = games.find(g => g.id === id);
							if (gameToAdd) addGame(gameToAdd);
						}
					});

					currentlySelected.forEach(id => {
						if (!ids.includes(id)) {
							const gameToRemove = games.find(g => g.id === id);
							if (gameToRemove) removeGame(gameToRemove);
						}
					});
				}}
				allGameTitles={games.map(game => game.title)}
				searchPlaceholder={searchHolder}
			/>
		</div>
	);
};
