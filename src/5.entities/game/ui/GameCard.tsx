import { AnimatePresence } from 'framer-motion'

import { Game } from '../model/types'

import { useChosenGames } from '@/4.features/chooseGame/model/useChosenGames'
import { ChoosenTarget } from '@/4.features/chooseGame/ui/ChoosenTarget'
import { TargetSelector } from '@/4.features/chooseGame/ui/TargetSelector'

export const GameCard = ({ game }: { game: Game }) => {
	const { chosenGames, toggleGame, toggleTargetSelector, resetPurpose } =
		useChosenGames()
	const selected = chosenGames[game.id]

	return (
		<div
			className='flex flex-col justify-between items-center p-2 rounded-md cursor-pointer'
			onClick={() => toggleGame(game.id)}
		>
			<div className='flex justify-between w-full'>
				<div className='flex gap-2 items-center'>
					<img
						src={game.icon}
						alt={game.title}
						className='w-[52px] h-[52px] rounded-2xl'
					/>
					<div>
						<div className='font-bold'>{game.title}</div>
						<div className='text-sm text-gray-400'>{game.players} чел.</div>
					</div>
				</div>

				<ChoosenTarget
					purpose={selected?.purpose}
					isActive={!!selected?.purpose}
					onClick={e => {
						e.stopPropagation()

						if (selected?.purpose && !selected?.isOpen) {
							resetPurpose(game.id)
						} else {
							toggleTargetSelector(game.id)
						}
					}}
				/>
			</div>

			<AnimatePresence>
				{selected?.isOpen && (
					<TargetSelector key={`selector-${game.id}`} gameId={game.id} />
				)}
			</AnimatePresence>
		</div>
	)
}
