import { motion } from 'framer-motion'

import CheckIco from '../../variantSelection/assets/check.svg?react'

import { useUserStore } from '@/5.entities/user/model/store'
import { useCustomTranslation } from '@/6.shared'

export const TargetSelector = ({ gameId }: { gameId: string }) => {
	const { profile, setPurpose } = useUserStore()
	const { justPlayTxt, conquerorTxt, praksTxt, duoTxt } =
		useCustomTranslation('targetSearchList')

	const selected = profile.games.find(g => g.id === gameId)?.purpose

	const purposes = [
		justPlayTxt,
		conquerorTxt,
		'TDM',
		'Ultimate Royal',
		praksTxt,
		duoTxt,
		'WoW'
	]
	return (
		<motion.div
			className='flex flex-wrap gap-2 mt-2 w-full'
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.35 }}
			style={{ overflow: 'hidden' }}
		>
			<h2 className='font-medium text-[15px] text-[#8a8989] text-left w-full mt-2'>
				Цель игры:
			</h2>
			{purposes.map(p => (
				<label
					key={p}
					className={`flex items-center justify-between p-2 px-3 rounded-2xl cursor-pointer text-sm transition-all duration-300 border
            ${selected === p ? 'border-purple-500 bg-purple-900/30 text-purple-300' : 'border-transparent bg-[var(--second-bg)] hover:border-purple-300'}
          `}
					onClick={e => {
						e.stopPropagation()
						setPurpose(gameId, p as any)
					}}
				>
					<span>{p}</span>
					<span
						className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ml-2
              ${selected === p ? 'border-purple-700 bg-purple-700' : 'border-gray-500'}
            `}
					>
						{selected === p && <CheckIco />}
					</span>
				</label>
			))}
		</motion.div>
	)
}
