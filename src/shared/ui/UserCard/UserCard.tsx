import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import InfoIco from '../../assets/icons/info.svg?react';
import NotificationIco from '../../assets/images/notification.svg?react';
import { ImageZoomModal } from '../ImageZoomModal/ImageZoomModal';

import styles from './UserCard.module.css';
import { EnumRoutes } from '@/app/router/router.consts';

export type UserCardProps = {
	name: string;
	age: number;
	gender: string;
	city?: string;
	languages?: string;
	avatarUrl: string | File;
	isOnline?: boolean;
	icon: 'notification' | 'info';
	coutry_code: string;
};

export const UserCard: React.FC<UserCardProps> = ({
	name,
	age,
	gender,
	city,
	avatarUrl,
	isOnline = false,
	icon = 'info',
	coutry_code
}) => {
	const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleAvatarClick = () => {
		setIsZoomModalOpen(true);
	};

	const handleCloseZoom = () => {
		setIsZoomModalOpen(false);
	};

	const handleNotificationClick = () => {
		console.log('Notification icon clicked in UserCard');
		navigate(EnumRoutes.NOTIFICATIONS);
	};

	const avatarSrc =
		typeof avatarUrl === 'string' ? avatarUrl : URL.createObjectURL(avatarUrl);

	return (
		<div className={styles.card}>
			<button
				className='bg-transparent border-none absolute right-2.5 top-2.5 cursor-pointer'
				onClick={icon === 'notification' ? handleNotificationClick : undefined}
			>
				{icon === 'info' && <InfoIco />}
				{icon === 'notification' && (
					<NotificationIco fill='var(--object-secondary-white)' />
				)}
			</button>
			<div className={styles.avatarWrapper}>
				<img
					src={avatarSrc}
					alt={name}
					className={styles.avatar}
					width={250}
					height={250}
					onClick={handleAvatarClick}
					style={{ cursor: 'pointer' }}
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
					<div className={styles.location}>{city ? 'г.' + city : ''}</div>
				</div>
			</div>
			<ImageZoomModal
				isOpen={isZoomModalOpen}
				imageSrc={avatarSrc}
				imageAlt={name}
				onClose={handleCloseZoom}
			/>
		</div>
	);
};
