import { useState } from 'react'

import { useUserFiltersToggleStore } from '../model/toggleUserFilter'

import FilterICon from '@/6.shared/ui/Filter/Filter'
import { ToggleTabs } from '@/6.shared/ui/ToggleTabs/ToggleTabs'

const UserListFilters = () => {
	const [status, setStatus] = useState('online')
	const open = useUserFiltersToggleStore(state => state.open)
	const statusOptions = [
		{
			label: 'Сейчас в сети',
			value: 'online',
			subtitle: '2.384 онлайн',
			icon: <span className='text-emerald-400 text-sm animate-pulse'>●</span>
		},
		{
			label: 'Оффлайн',
			value: 'offline'
		}
	]

	return (
		<div className='flex items-center gap-2.5 w-full'>
			<button className='bg-transparent border-none' onClick={open}>
				<FilterICon />
			</button>
			<ToggleTabs
				options={statusOptions}
				active={status}
				onChange={setStatus}
			/>
		</div>
	)
}

export default UserListFilters
