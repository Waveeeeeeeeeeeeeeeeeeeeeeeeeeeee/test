import styles from './OnboardingChooseGame.module.css';
import { Game } from '@/entities/game/model/types';
import { useGamesWithPurposes } from '@/entities/game/model/useGamesWithPurposes';
import { useUserStore } from '@/entities/user/model/store';
import { Purpose } from '@/entities/user/model/types';
import { useCustomTranslation } from '@/shared';
import { useGameFilter } from '@/widgets/gameList/model/useGameFilter';
import { GameList } from '@/widgets/gameList/ui/GameList';

export const OnboardingChooseGame = () => {
	const { title, searchHolder } = useCustomTranslation('onboardingChooseGame');

	const { search, onChange } = useGameFilter();
	const { profile, addGame, removeGame, toggleTargetSelector, resetPurpose } =
		useUserStore();
	const { games } = useGamesWithPurposes();

	const handleToggle = (game: Game) => {
		if (profile.games.some(g => g.id === game.id)) {
			removeGame(game);
		} else {
			addGame(game);
		}
	};

	const selectedGameIds = profile.games.map(g => g.id);

	const getPurposeByGameId = (id: string): Purpose[] | undefined =>
		profile.games.find(g => g.id === id)?.purposes ?? undefined;

	const checkIsOpen = (id: string) =>
		profile.games.find(g => g.id === id)?.isOpen ?? false;

	const handleTargetToggle = (id: string) => {
		const game = profile.games.find(g => g.id === id);
		if (!game?.purposes?.length) {
			resetPurpose(id);
			removeGame(game as Game);
		} else {
			toggleTargetSelector(id);
		}
	};

	return (
		<div className='relative flex flex-col gap-7 pb-20'>
			<h2 className={styles.title}>{title}</h2>
			<GameList
				games={games}
				searchValue={search}
				onSearchChange={value =>
					onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
				}
				onToggle={handleToggle}
				selectedGameIds={selectedGameIds}
				allGameTitles={games.map(game => game.title)}
				searchPlaceholder={searchHolder}
				withTargetSelector={true}
				getPurpose={getPurposeByGameId}
				isTargetSelectorOpen={checkIsOpen}
				onTogglePurpose={handleTargetToggle}
			/>
		</div>
	);
};
