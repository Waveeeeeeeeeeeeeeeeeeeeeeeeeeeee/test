import { FC, useState } from 'react'
import { useNavigate } from 'react-router'

import HeartIco from '../../../6.shared/assets/images/heart.svg?react'
import { SearchCardTypes } from '../model/types'

import styles from './SearchCard.module.css'

interface Props {
	data: SearchCardTypes
}

export const SearchCard: FC<Props> = ({ data }) => {
	const navigate = useNavigate()
	const [isSubscribe, setIsSubscribe] = useState(false)

	const handleCardClick = () => {
		navigate(data.href)
	}

	const handleHeartClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsSubscribe(!isSubscribe)
	}

	return (
		<div
			className={`relative rounded-2xl bg-[#1a1a1a] cursor-pointer hover:scale-[1.01] transition-all duration-200 ${styles.card}`}
		>
			<div
				className='absolute inset-0 z-10'
				onClick={handleCardClick}
				aria-hidden='true'
			/>

			<div className='p-3 h-full flex flex-col justify-between gap-11.5 relative'>
				<div className='z-20 w-5 h-5 relative' onClick={handleHeartClick}>
					<HeartIco fill={isSubscribe ? 'white' : ''} />
				</div>

				<data.icon
					className='absolute w-24 h-24 top-1 right-2 z-0'
					style={{
						filter:
							'drop-shadow(0 0 3px rgba(0, 255, 150, 0.2)) drop-shadow(0 0 5px rgba(0, 255, 150, 0.2))'
					}}
				/>

				<div className='flex flex-col items-start justify-center gap-1 relative z-10'>
					<h3 className='text-white text-lg font-semibold text-center'>
						{data.title}
					</h3>
					<p className='text-gray-400 text-sm'>
						<span className='text-emerald-400 w-1 h-1 animate-pulse'>●</span>{' '}
						{data.players.toLocaleString('ru-RU')} онлайн
					</p>
				</div>
			</div>
		</div>
	)
}
