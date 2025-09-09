import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

import styles from './TagsSelectors.module.css'
import AddIco from '@/shared/assets/icons/add.svg?react'
import DeleteIco from '@/shared/assets/icons/delete.svg?react'
import { useCustomTranslation } from '@/shared/lib'

type TagSelectorProps = {
	presetTags: string[]
	interests: string[]
	toggleInterest: (interest: string) => void
	edit?: boolean
	addInterest?: (tag: string) => void
}

export const TagSelector = ({
	presetTags,
	interests,
	toggleInterest,
	edit = false,
	addInterest
}: TagSelectorProps) => {
	const [tags, setTags] = useState(presetTags)
	const [value, setValue] = useState('')

	const { tagplaceholder } = useCustomTranslation('accountInfoStep3')

	const handleAddTag = () => {
		if (value.trim() && !tags.includes(value)) {
			setTags(prev => [value, ...prev])
			setValue('')
		}
		if (addInterest) addInterest(value)
	}

	const handleRemoveTag = (tagToRemove: string) => {
		setTags(prev => prev.filter(tag => tag !== tagToRemove))
		if (interests.includes(tagToRemove)) {
			toggleInterest(tagToRemove)
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
						<AddIco />
					</button>
				</div>

				{tags.map(tag => (
					<motion.div
						key={tag}
						className={clsx(
							styles.itemWrapper,
							!edit && interests.includes(tag) && styles.active
						)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.15 }}
						layout
					>
						<button
							className={clsx(styles.item)}
							onClick={() => toggleInterest(tag)}
						>
							{tag}
						</button>
						{edit && (
							<button
								className={styles.deleteButton}
								onClick={() => handleRemoveTag(tag)}
								title='Удалить'
							>
								<DeleteIco fill='white' />
							</button>
						)}
					</motion.div>
				))}
			</div>
		</div>
	)
}
