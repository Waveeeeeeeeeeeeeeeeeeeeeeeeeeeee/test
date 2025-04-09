import { useState } from 'react'

import FilterICon from '@/6.shared/ui/Filter/Filter'
import { ToggleTabs } from '@/6.shared/ui/ToggleTabs/ToggleTabs'

const UserListFilters = () => {
	const [status, setStatus] = useState('online')

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
		<div className='flex items-center gap-2.5 w-full max-w-md'>
			<FilterICon />
			<ToggleTabs
				options={statusOptions}
				active={status}
				onChange={setStatus}
			/>
		</div>
	)
}

export default UserListFilters
