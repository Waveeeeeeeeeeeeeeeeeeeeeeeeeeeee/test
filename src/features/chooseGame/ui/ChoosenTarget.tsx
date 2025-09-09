import CheckIco from '../../variantSelection/assets/check.svg?react'

import { Purpose } from '@/entities/user/model/types'

interface ChoosenTargetProps {
	purpose?: Purpose[] | []
	isActive: boolean
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ChoosenTarget = ({
	purpose,
	isActive,
	onClick
}: ChoosenTargetProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 p-2 px-3 rounded-2xl transition-colors duration-300	cursor-pointer`}
		>
			{isActive && !!purpose?.length && (
				<span className='text-purple-400 font-semibold text-sm'>
					{purpose[0].purpose_name}{' '}
					{purpose.length - 1 > 0 ? `+${purpose.length - 1}` : ''}
				</span>
			)}
			<span
				className={`w-5 h-5 border-2 rounded-full flex items-center justify-center 
          ${isActive ? 'border-purple-700 bg-purple-700' : 'border-gray-500'} 
          transition-colors`}
			>
				{isActive && <CheckIco className='text-white w-3 h-3' />}
			</span>
		</button>
	)
}
