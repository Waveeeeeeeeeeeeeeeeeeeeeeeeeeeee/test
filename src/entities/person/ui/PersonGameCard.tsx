import styles from './PersonGameCard.module.css'
import { PersonGame } from '@/features/personGamesSlider/model/types'
import VerifideIco from '@/shared/assets/icons/verified.svg?react'

type Props = {
	game: PersonGame
}

export const PersonGameCard = ({ game }: Props) => {
	return (
		<div
			className={`rounded-2xl p-1.5 flex items-center justify-between text-white ${styles.card}`}
		>
			<div className='flex items-center space-x-4'>
				<img
					src={game.iconUrl}
					alt={game.title}
					className='w-15 h-15 rounded-lg object-cover'
				/>
				<div>
					<h3 className={styles.title}>
						{game.title}
						{game.verify && <VerifideIco />}
					</h3>
					<div className='text-sm text-gray-400 flex items-center gap-2'>
						{/* lvl. {game.level} */}
						<span className={styles.subtitle}>{game.badgeLabel}</span>
						{/* <span>{game.mode}</span> */}
					</div>
				</div>
			</div>
			{game.infoImg && (
				<img
					src={game.iconUrl}
					alt={game.title}
					className='w-15 h-15 rounded-lg object-cover'
				/>
			)}
		</div>
	)
}
