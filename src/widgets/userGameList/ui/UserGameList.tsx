import { AnimatePresence, motion } from 'framer-motion'

import { GameCard } from '@/entities/game/ui/GameCard'
import { useUserStore } from '@/entities/user/model/store'

export const UserGameList = () => {
	const { profile } = useUserStore()
	const gamesWithPurpose = profile.games.filter(
		game => game.purposes && game.purposes.length > 0
	)

	return (
		<div className='flex flex-col gap-4 relative'>
			<AnimatePresence mode='wait'>
				{gamesWithPurpose.map(game => (
					<motion.div
						key={game.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.25 }}
						className='flex flex-col gap-11'
					>
						<GameCard
							game={game}
							isSelected={true}
							withTargetSelector
							purpose={game.purposes}
							isTargetSelectorOpen={false}
							onTogglePurpose={() => {}}
							withPhotoUpload
							defaultPurpose={[]}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
