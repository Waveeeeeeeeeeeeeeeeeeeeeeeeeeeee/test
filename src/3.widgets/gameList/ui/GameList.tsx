import { useState } from 'react'

import { GameListProps } from '../model/types'

import Search from '@/4.features/search/Search'
import { GameCard } from '@/5.entities/game/ui/GameCard'

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
}: GameListProps) => {
	const [selectedTag, setSelectedTag] = useState<string | null>(null)

	const filteredGames = selectedTag
		? games.filter(game => game.title === selectedTag)
		: searchValue.trim() === ''
			? games
			: games.filter(game =>
					game.title.toLowerCase().includes(searchValue.toLowerCase())
				)

	const handleAddInterest = (tag: string) => {
		const game = games.find(g => g.title === tag)
		if (game) onToggle(game)
		setSelectedTag(tag)
		onSearchChange('')
	}

	const handleSearchChange = (value: string) => {
		onSearchChange(value)
		if (value === '') {
			setSelectedTag(null)
		}
	}
	return (
		<div className='w-full mx-auto'>
			<Search
				tags={allGameTitles}
				addInterest={handleAddInterest}
				placeholder={searchPlaceholder}
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
			/>

			<div className='flex flex-col gap-4 max-h-[343px] overflow-y-auto'>
				{filteredGames.map(game => (
					<GameCard
						key={game.id}
						defaultPurpose={game.purposes}
						game={game}
						isSelected={selectedGameIds.includes(game.id)}
						onClick={() => {
							const isAlreadySelected = selectedGameIds.includes(game.id)

							if (isAlreadySelected && onTogglePurpose) {
								onTogglePurpose(game.id)
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
