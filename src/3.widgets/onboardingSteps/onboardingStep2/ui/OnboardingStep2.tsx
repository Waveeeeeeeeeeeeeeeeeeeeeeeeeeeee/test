import styles from './OnboardingStep2.module.css'
import { useGameFilter } from '@/3.widgets/gameList/model/useGameFilter'
import { GameList } from '@/3.widgets/gameList/ui/GameList'
import { Game } from '@/5.entities/game/model/types'
import { useGamesWithPurposes } from '@/5.entities/game/model/useGamesWithPurposes'
import { useUserStore } from '@/5.entities/user/model/store'
import { Purpose } from '@/5.entities/user/model/types'
import { useCustomTranslation } from '@/6.shared'

export const OnboardingStep2 = () => {
	const { title, searchHolder } = useCustomTranslation('onboardingStep2')

	const { search, onChange } = useGameFilter()
	const { profile, addGame, removeGame, toggleTargetSelector, resetPurpose } =
		useUserStore()
	const { games } = useGamesWithPurposes()

	const handleToggle = (game: Game) => {
		if (profile.games.some(g => g.id === game.id)) {
			removeGame(game)
		} else {
			addGame(game)
		}
	}

	const selectedGameIds = profile.games.map(g => g.id)

	const getPurposeByGameId = (id: string): Purpose[] | undefined =>
		profile.games.find(g => g.id === id)?.purposes ?? undefined

	const checkIsOpen = (id: string) =>
		profile.games.find(g => g.id === id)?.isOpen ?? false

	const handleTargetToggle = (id: string) => {
		const game = profile.games.find(g => g.id === id)
		if (!game?.purposes?.length) {
			resetPurpose(id)
			removeGame(game as Game)
		} else {
			toggleTargetSelector(id)
		}
	}
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
	)
}
