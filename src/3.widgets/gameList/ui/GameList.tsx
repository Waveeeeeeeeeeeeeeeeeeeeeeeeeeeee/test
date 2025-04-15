import { useGameFilter } from '../model/useGameFilter'

import Search from '@/4.features/search/Search'
import { gameList } from '@/5.entities/game/config/gameList'
import { Game } from '@/5.entities/game/model/types'
import { GameCard } from '@/5.entities/game/ui/GameCard'
import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'

export const GameList = () => {
	const { search, onChange } = useGameFilter()
	const { profile, addGame, removeGame } = useUserStore()
	const { searchHolder } = useCustomTranslation('onboardingStep2')

	const filteredGames = gameList.filter(game =>
		game.title.toLowerCase().includes(search.toLowerCase())
	)
	const allGameTitles = gameList.map(game => game.title)

	const handleAddInterest = (tag: string) => {
		onChange({ target: { value: tag } } as React.ChangeEvent<HTMLInputElement>)
		const gameToAdd = gameList.find(game => game.title === tag)
		if (gameToAdd) {
			addGame(gameToAdd)
		}
	}

	const isGameSelected = (gameId: string) => {
		return profile.games.some(game => game.id === gameId)
	}

	const handleRemoveGame = (game: Game) => {
		removeGame(game)
	}

	return (
		<div className='w-full max-w-md mx-auto p-4'>
			<Search
				tags={allGameTitles}
				addInterest={handleAddInterest}
				placeholder={searchHolder}
			/>

			<div className='flex flex-col gap-4'>
				{filteredGames.map(game => (
					<GameCard
						key={game.id}
						game={game}
						isSelected={isGameSelected(game.id)}
						onToggle={() =>
							isGameSelected(game.id) ? handleRemoveGame(game) : addGame(game)
						}
					/>
				))}
			</div>
		</div>
	)
}
