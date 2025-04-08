import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

import styles from './TagsSelectors.module.css'
import { useCustomTranslation } from '@/6.shared/lib'

export const TagSelector = ({
	presetTags,
	interests,
	toggleInterest
}: {
	presetTags: string[]
	interests: string[]
	toggleInterest: (interest: string) => void
}) => {
	const [tags, setTags] = useState(presetTags)
	const [value, setValue] = useState('')

	const { tagplaceholder } = useCustomTranslation('accountInfoStep3')
	const handleAddTag = () => {
		if (value.trim() && !tags.includes(value)) {
			setTags(prev => [value, ...prev])
			setValue('')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.tagsContainer}>
				<div className={styles.addItem}>
					<input
						type='text'
						placeholder={tagplaceholder}
						className={styles.input}
						value={value}
						onChange={e => setValue(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleAddTag()}
					/>
					<button type='button' onClick={handleAddTag} disabled={!value.trim()}>
						<svg
							width='14'
							height='14'
							viewBox='0 0 14 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M6 8H1C0.716667 8 0.479167 7.90417 0.2875 7.7125C0.0958333 7.52083 0 7.28333 0 7C0 6.71667 0.0958333 6.47917 0.2875 6.2875C0.479167 6.09583 0.716667 6 1 6H6V1C6 0.716667 6.09583 0.479167 6.2875 0.2875C6.47917 0.0958333 6.71667 0 7 0C7.28333 0 7.52083 0.0958333 7.7125 0.2875C7.90417 0.479167 8 0.716667 8 1V6H13C13.2833 6 13.5208 6.09583 13.7125 6.2875C13.9042 6.47917 14 6.71667 14 7C14 7.28333 13.9042 7.52083 13.7125 7.7125C13.5208 7.90417 13.2833 8 13 8H8V13C8 13.2833 7.90417 13.5208 7.7125 13.7125C7.52083 13.9042 7.28333 14 7 14C6.71667 14 6.47917 13.9042 6.2875 13.7125C6.09583 13.5208 6 13.2833 6 13V8Z'
								fill='white'
							/>
						</svg>
					</button>
				</div>

				{tags.map(tag => (
					<motion.button
						key={tag}
						className={clsx(
							styles.item,
							interests.includes(tag) && styles.active
						)}
						onClick={() => toggleInterest(tag)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.15 }}
						layout
					>
						{tag}
					</motion.button>
				))}
			</div>
		</div>
	)
}
