import { AnimatePresence } from 'framer-motion'

import { Game } from '../model/types'

import { ChoosenTarget } from '@/4.features/chooseGame/ui/ChoosenTarget'
import { TargetSelector } from '@/4.features/chooseGame/ui/TargetSelector'
import { useUserStore } from '@/5.entities/user/model/store'

interface GameCardProps {
	game: Game
	isSelected: boolean
	onToggle: (id: string) => void
}

export const GameCard = ({ game, onToggle }: GameCardProps) => {
	const { profile, toggleTargetSelector, resetPurpose, removeGame } =
		useUserStore()

	const selected = profile.games.find(g => g.id === game.id)
	return (
		<div
			className='flex flex-col justify-between items-center p-2 rounded-md cursor-pointer'
			onClick={() => onToggle(game.id)}
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
							removeGame(game)
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
