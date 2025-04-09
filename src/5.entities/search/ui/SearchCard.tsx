import { FC } from 'react'
import { useNavigate } from 'react-router'

import HeartIco from '../../../6.shared/assets/images/heart.svg?react'
import { SearchCardTypes } from '../model/types'

import styles from './SearchCard.module.css'

interface Props {
	data: SearchCardTypes
}

export const SearchCard: FC<Props> = ({ data }) => {
	const navigate = useNavigate()
	return (
		<div
			onClick={() => navigate(data.href)}
			className={`relative rounded-2xl bg-[#1a1a1a] cursor-pointer hover:scale-[1.01] transition-all duration-200 ${styles.card}`}
		>
			<div className='p-3 h-full flex flex-col justify-between gap-11.5'>
				<div>
					<HeartIco />
					<data.icon
						className='absolute w-24 h-24 top-1 right-2'
						style={{
							filter:
								'drop-shadow(0 0 3px rgba(0, 255, 150, 0.2)) drop-shadow(0 0 5px rgba(0, 255, 150, 0.2))'
						}}
					/>
				</div>
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
