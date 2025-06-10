import styles from './ProfileGames.module.css'
import { useGameFilter } from '@/3.widgets/gameList/model/useGameFilter'
import { GameList } from '@/3.widgets/gameList/ui/GameList'
import { UserGameList } from '@/3.widgets/userGameList/ui/UserGameList'
import { Game } from '@/5.entities/game/model/types'
import { useGamesWithPurposes } from '@/5.entities/game/model/useGamesWithPurposes'
import { useUserStore } from '@/5.entities/user/model/store'
import { Purpose } from '@/5.entities/user/model/types'
import { Button, useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'

const ProfileGames = () => {
	const { title, subtitle } = useCustomTranslation('profileGames')
	const { searchHolder } = useCustomTranslation('onboardingStep2')
	const { backBtn, saveBtn } = useCustomTranslation('profileSettings')
	const { search, onChange } = useGameFilter()
	const { games } = useGamesWithPurposes()
	const { profile, addGame, removeGame, toggleTargetSelector, resetPurpose } =
		useUserStore()

	const handleToggle = (game: Game) => {
		if (!profile.games.some(g => g.id === game.id)) {
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
		if (game?.purposes?.length === 0) {
			resetPurpose(id)
			removeGame(game)
		} else {
			toggleTargetSelector(id)
		}
	}
	const handleBack = () => {
		window.history.back()
	}

	return (
		<>
			<div className='p-4 px-4 h-screen relative overflow-scroll pb-20 flex flex-col gap-7.5'>
				<NotificationHeader
					back
					title={title}
					goBack={handleBack}
					notification={false}
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

			<div className={`flex w-full gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={handleBack}>
					{backBtn}
				</Button>
				<Button variant='accept' onClick={handleBack}>
					{saveBtn}
				</Button>
			</div>
		</>
	)
}

export default AnimatedPage(ProfileGames)
