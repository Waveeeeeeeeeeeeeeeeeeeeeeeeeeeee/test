import { useLocation, useNavigate } from 'react-router'

import FriendsIcon from '../../../6.shared/assets/icons/Friends.svg?react'
import HomeIcon from '../../../6.shared/assets/icons/Home.svg?react'
import SearchIcon from '../../../6.shared/assets/icons/Search.svg?react'

import styles from './BottomNavigation.module.css'
import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'

export const BottomNavigation = () => {
	const { label1, label2, label3, label4 } = useCustomTranslation('bottomBar')
	const navigationItems = [
		{
			label: label1,
			path: '/',
			icon: HomeIcon
		},
		{
			label: label2,
			path: '/search/just-play',
			icon: SearchIcon
		},
		{
			label: label3,
			path: '/friends',
			icon: FriendsIcon
		},
		{
			label: label4,
			path: '/profile',
			isProfile: true
		}
	]
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUserStore()

	return (
		<nav className='fixed z-[100] bottom-0 p-4 w-full flex justify-between items-center bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
			{navigationItems.map(item => {
				const isActive =
					item.path === '/'
						? location.pathname === '/'
						: location.pathname.startsWith(item.path)
				return (
					<button
						key={item.path}
						onClick={() => navigate(item.path)}
						className='group flex flex-col items-center gap-1 cursor-pointer'
					>
						{item.isProfile && user?.photo_url ? (
							<div className={`${styles.before} group-hover:brightness-110`}>
								<img
									src={user.photo_url}
									alt={item.label}
									className='rounded-full group-hover:ring-2 group-hover:ring-white transition-all'
									width={24}
									height={24}
								/>
							</div>
						) : (
							item.icon && (
								<item.icon
									fill={isActive ? 'white' : '#828289'}
									className='transition-all duration-200 group-hover:fill-white'
								/>
							)
						)}
						<span
							className={`font-medium text-xs transition-all duration-200 ${
								isActive
									? 'text-white'
									: 'text-[var(--object-secondary-white)] group-hover:text-white'
							}`}
						>
							{item.label}
						</span>
					</button>
				)
			})}
		</nav>
	)
}
