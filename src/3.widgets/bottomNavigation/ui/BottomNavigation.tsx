import { useLocation, useNavigate } from 'react-router'

import { navigationItems } from '../model/data'

import styles from './BottomNavigation.module.css'
import { useUserStore } from '@/5.entities/user/model/store'

export const BottomNavigation = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUserStore()

	return (
		<nav className='p-4 flex justify-between items-center'>
			{navigationItems.map(item => {
				const isActive = location.pathname === item.path
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
