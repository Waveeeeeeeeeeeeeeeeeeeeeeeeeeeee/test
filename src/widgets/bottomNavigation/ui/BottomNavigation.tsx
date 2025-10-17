import { User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import styles from './BottomNavigation.module.css';
import { useUserStore } from '@/entities/user/model/store';
import { useCustomTranslation } from '@/shared';
import FriendsIcon from '@/shared/assets/icons/Friends.svg?react';
import HomeIcon from '@/shared/assets/icons/Home.svg?react';

export const BottomNavigation = () => {
	const { label1, label3, label4 } = useCustomTranslation('bottomBar');
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useUserStore();

	// Check if we're on the profile info pages
	const isProfileInfoRealLife = location.pathname === '/profile/info/realLife';
	const isProfileInfoOnline = location.pathname === '/profile/info/online';
	const isProfileInfoPage = isProfileInfoRealLife || isProfileInfoOnline;

	const handleSave = () => {
		// Add save logic here
		console.log('Saving profile info...');
		// You can add actual save logic here
		navigate('/profile');
	};

	const handleCancel = () => {
		// Add cancel logic here
		console.log('Canceling changes...');
		navigate('/profile');
	};

	// Custom buttons for profile info pages
	if (isProfileInfoPage) {
		return (
			<nav className='fixed z-[100] bottom-0 p-4 w-full flex gap-4 bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
				<button
					onClick={handleCancel}
					className='flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold'
				>
					Отменить изменения
				</button>
				<button
					onClick={handleSave}
					className='flex-1 bg-[#6B5CD1] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2'
				>
					Сохранить
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
						<path
							d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'
							fill='white'
						/>
					</svg>
				</button>
			</nav>
		);
	}

	const navigationItems = [
		{
			label: label1,
			path: '/home',
			icon: HomeIcon
		},
		{
			label: label3,
			path: '/friends',
			icon: FriendsIcon
		},
		{
			label: label4,
			path: '/profile',
			isProfile: true,
			icon: User
		}
	];

	return (
		<nav className='fixed z-[100] bottom-0 p-4 w-full flex justify-between items-center bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
			{navigationItems.map(item => {
				const isActive =
					item.path === '/'
						? location.pathname === '/' ||
							location.pathname.startsWith('/search')
						: location.pathname.startsWith(item.path);
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
									color='#828289'
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
				);
			})}
		</nav>
	);
};
