import { GameCard } from '@/5.entities/game/ui/GameCard'
import { useUserStore } from '@/5.entities/user/model/store'

export const UserGameList = () => {
	const { profile } = useUserStore()
	return (
		<div className='flex flex-col gap-4'>
			{profile.games.map(game => (
				<div key={game.id} className='flex flex-col gap-11'>
					<GameCard
						game={game}
						isSelected={true}
						withTargetSelector
						purpose={game.purpose}
						isTargetSelectorOpen={false}
						onTogglePurpose={() => {}}
						withPhotoUpload
					/>
				</div>
			))}
		</div>
	)
}
