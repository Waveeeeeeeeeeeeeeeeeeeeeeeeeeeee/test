import React from 'react'

import InfoIco from '../../assets/icons/info.svg?react'
import ru from '../../assets/images/ru.png'
import ua from '../../assets/images/ua.png'
import usa from '../../assets/images/usa.png'

import styles from './UserCard.module.css'

type Props = {
	name: string
	age: number
	gender: string
	city: string
	languages: string
	avatarUrl: string | File
	isOnline?: boolean
}

const languageFlags: Record<string, string> = {
	ru: ru,
	ua: ua,
	en: usa
}

export const UserCard: React.FC<Props> = ({
	name,
	age,
	gender,
	city,
	languages,
	avatarUrl,
	isOnline = false
}) => {
	return (
		<div className={styles.card}>
			<button className='bg-transparent border-none absolute right-2.5 top-2.5 cursor-pointer'>
				<InfoIco />
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
						src={languageFlags[languages]}
						alt={languages}
						width={16}
						height={16}
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
