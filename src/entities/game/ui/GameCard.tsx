import { AnimatePresence } from 'framer-motion'

import { Game } from '../model/types'

import { Purpose } from '@/entities/user/model/types'
import { ChoosenTarget } from '@/features/chooseGame/ui/ChoosenTarget'
import { TargetSelector } from '@/features/chooseGame/ui/TargetSelector'
import { GameImageUpload } from '@/features/game/uploadImage/GameImageUpload'

interface GameCardProps {
	game: Game
	isSelected: boolean
	withTargetSelector?: boolean
	purpose?: Purpose[]
	isTargetSelectorOpen?: boolean
	onClick?: () => void
	onTogglePurpose?: () => void
	withPhotoUpload?: boolean
	defaultPurpose: Purpose[]
}

export const GameCard = ({
	game,
	isSelected,
	withTargetSelector = false,
	purpose,
	isTargetSelectorOpen = false,
	onClick,
	onTogglePurpose,
	withPhotoUpload = false,
	defaultPurpose
}: GameCardProps) => {
	return (
		<div
			className='flex flex-col justify-between items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-zinc-800/50'
			onClick={onClick}
		>
			<div className='flex justify-between w-full items-center'>
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
					purpose={withTargetSelector ? purpose : []}
					isActive={isSelected}
					onClick={e => {
						e.stopPropagation()
						withTargetSelector ? onTogglePurpose?.() : onClick?.()
					}}
				/>
			</div>
			{withPhotoUpload && <GameImageUpload gameId={game.id} />}
			{withTargetSelector && (
				<AnimatePresence>
					{isTargetSelectorOpen && (
						<TargetSelector
							key={`selector-${game.id}`}
							gameId={game.id}
							defaultPurpose={defaultPurpose}
						/>
					)}
				</AnimatePresence>
			)}
		</div>
	)
}
