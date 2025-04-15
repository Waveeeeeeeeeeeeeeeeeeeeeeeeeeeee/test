import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import styles from './ShowInterests.module.css'

interface Props {
	interests: string[]
	maxVisible?: number
}

export const ShowInterests: React.FC<Props> = ({
	interests,
	maxVisible = 6
}) => {
	const [expanded, setExpanded] = useState(false)

	const hiddenCount = interests.length - maxVisible
	const toggleExpanded = () => setExpanded(prev => !prev)

	const visible = interests.slice(0, maxVisible)
	const hidden = interests.slice(maxVisible)

	return (
		<div className='flex flex-wrap gap-2'>
			{visible.map((interest, index) => (
				<span key={interest + index} className={styles.interest}>
					{interest}
				</span>
			))}

			<AnimatePresence>
				{expanded &&
					hidden.map((interest, index) => (
						<motion.span
							key={interest + index}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className={styles.interest}
						>
							{interest}
						</motion.span>
					))}
			</AnimatePresence>

			<AnimatePresence mode='wait'>
				{hiddenCount > 0 && (
					<motion.button
						key={expanded ? 'hide' : 'show'}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						onClick={toggleExpanded}
						className={`${styles.interest} cursor-pointer`}
					>
						{expanded ? 'Скрыть' : `+${hiddenCount}`}
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	)
}
