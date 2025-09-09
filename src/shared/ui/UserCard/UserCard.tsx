import React from 'react'

import InfoIco from '../../assets/icons/info.svg?react'
import NotificationIco from '../../assets/images/notification.svg?react'

import styles from './UserCard.module.css'

export type UserCardProps = {
	name: string
	age: number
	gender: string
	city: string
	languages: string
	avatarUrl: string | File
	isOnline?: boolean
	icon: 'notification' | 'info'
	coutry_code: string
}

export const UserCard: React.FC<UserCardProps> = ({
	name,
	age,
	gender,
	city,
	languages,
	avatarUrl,
	isOnline = false,
	icon = 'info',
	coutry_code
}) => {
	return (
		<div className={styles.card}>
			<button className='bg-transparent border-none absolute right-2.5 top-2.5 cursor-pointer'>
				{icon === 'info' && <InfoIco />}
				{icon === 'notification' && (
					<NotificationIco fill='var(--object-secondary-white)' />
				)}
			</button>
			<div className={styles.avatarWrapper}>
				<img
					src={
						typeof avatarUrl === 'string'
							? avatarUrl
							: URL.createObjectURL(avatarUrl)
					}
					alt={name}
					className={styles.avatar}
					width={150}
					height={150}
				/>
				{isOnline && <span className={styles.statusDot} />}
			</div>
			<div className={styles.info}>
				<div className={styles.nameRow}>
					<img
						src={`https://flagcdn.com/16x12/${coutry_code.toLowerCase()}.png`}
						width='16'
						height='12'
						alt='Украина'
					/>
					<span className={styles.name}>{name}</span>
					<span className={styles.meta}>
						{gender.charAt(0).toUpperCase()}, {age}
					</span>
				</div>
				<div className={styles.nameRow}>
					<div className={styles.location}>г. {city}</div>
					<div className={styles.langs}>{languages.toUpperCase()}</div>
				</div>
			</div>
		</div>
	)
}
