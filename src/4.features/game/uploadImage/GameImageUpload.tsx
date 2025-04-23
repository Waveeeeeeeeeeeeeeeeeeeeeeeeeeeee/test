import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'

import TrashIco from '../../../6.shared/assets/icons/delete.svg?react'

import styles from './GameImageUpload.module.css'
import { useUserStore } from '@/5.entities/user/model/store'
import { Button, useCustomTranslation } from '@/6.shared'

type Props = {
	gameId: string
}

export const GameImageUpload: React.FC<Props> = ({ gameId }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { setGamePhoto, profile } = useUserStore()
	const { upload } = useCustomTranslation('gameImageUpload')
	const game = profile.games.find(g => g.id === gameId)
	const photo = game?.photo

	const handleClick = () => {
		inputRef.current?.click()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setGamePhoto(gameId, file)
		}
	}

	const handleImageDelete = () => {
		setGamePhoto(gameId, null)
	}

	return (
		<div className='flex flex-col gap-2 w-full max-w-[300px] ml-auto'>
			<AnimatePresence>
				{photo && (
					<motion.div
						key='photo-preview'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.3 }}
						className={`${styles.photoContainer} flex items-center justify-between p-2`}
					>
						<div className='flex items-center gap-3'>
							<img
								src={URL.createObjectURL(photo)}
								className={styles.photo}
								alt='Выбранное изображение'
								width={40}
								height={40}
								style={{ borderRadius: 8, objectFit: 'cover' }}
							/>
							<div className='flex flex-col'>
								<span className={styles.photoName}>{photo.name}</span>
								<span className={styles.photoSub}>
									{Math.round(photo.size / 1024)} Кб
								</span>
							</div>
						</div>

						<button
							className='text-gray-400 hover:text-red-500 cursor-pointer'
							onClick={handleImageDelete}
						>
							<TrashIco fill='#828289' width={24} height={24} />
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={handleChange}
				className='hidden'
			/>

			<div className='w-full flex justify-center'>
				<Button variant='secondary' onClick={handleClick}>
					{upload}
				</Button>
			</div>
		</div>
	)
}
