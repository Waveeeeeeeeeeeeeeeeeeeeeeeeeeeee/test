import { profileMenuItems } from '../config'

import { ProfileMenuItemCard } from '@/entities/profileMenuItem/ui/ProfileMenuItemCard'

const ProfileMenu = () => {
	return (
		<div className='flex flex-col gap-1.5'>
			{profileMenuItems.map((item, index) => (
				<ProfileMenuItemCard key={index} item={item} />
			))}
		</div>
	)
}

export default ProfileMenu
