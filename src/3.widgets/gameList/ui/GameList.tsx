import { GameListProps } from '../model/types'

import Search from '@/4.features/search/Search'
import { GameCard } from '@/5.entities/game/ui/GameCard'
import { Purpose } from '@/5.entities/user/model/types'

export const GameList = ({
	games,
	searchValue,
	onSearchChange,
	onToggle,
	selectedGameIds,
	allGameTitles,
	searchPlaceholder = 'Поиск',
	withTargetSelector = false,
	getPurpose,
	isTargetSelectorOpen,
	onTogglePurpose
}: GameListProps & {
	withTargetSelector?: boolean
	getPurpose?: (id: string) => Purpose[] | undefined
	isTargetSelectorOpen?: (id: string) => boolean
	onTogglePurpose?: (id: string) => void
}) => {
	const filteredGames = games.filter(game =>
		game.title.toLowerCase().includes(searchValue.toLowerCase())
	)

	const handleAddInterest = (tag: string) => {
		onSearchChange(tag)
		const game = games.find(g => g.title === tag)
		if (game) onToggle(game)
	}

	return (
		<div className='w-full mx-auto'>
			<Search
				tags={allGameTitles}
				addInterest={handleAddInterest}
				placeholder={searchPlaceholder}
			/>

			<div className='flex flex-col gap-4 max-h-[343px] overflow-y-auto'>
				{filteredGames.map(game => (
					<GameCard
						key={game.id}
						game={game}
						isSelected={selectedGameIds.includes(game.id)}
						onClick={() => {
							const isAlreadySelected = selectedGameIds.includes(game.id)

							if (isAlreadySelected) {
								onTogglePurpose?.(game.id)
							} else {
								onToggle(game)
							}
						}}
						withTargetSelector={withTargetSelector}
						purpose={getPurpose?.(game.id)}
						isTargetSelectorOpen={isTargetSelectorOpen?.(game.id)}
						onTogglePurpose={() => onTogglePurpose?.(game.id)}
					/>
				))}
			</div>
		</div>
	)
}
