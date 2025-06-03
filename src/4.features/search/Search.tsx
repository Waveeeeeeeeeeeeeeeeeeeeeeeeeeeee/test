import React, { useEffect, useState } from 'react'

import { useDebounce } from '@/6.shared/lib/hooks/useDebounce'

interface TagSearchProps {
	tags: string[]
	addInterest: (tag: string) => void
	placeholder: string
}

const Search: React.FC<TagSearchProps> = ({
	tags,
	addInterest,
	placeholder
}) => {
	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 300)
	const [filteredTags, setFilteredTags] = useState<string[]>([])
	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(() => {
		if (debouncedQuery.trim() === '') {
			setFilteredTags([])
			setShowDropdown(false)
			return
		}

		const results = tags.filter(tag =>
			tag.toLowerCase().includes(debouncedQuery.toLowerCase())
		)
		setFilteredTags(results)
		setShowDropdown(results.length > 0)
	}, [debouncedQuery, tags])

	const handleAdd = (tag: string) => {
		addInterest(tag)
		setQuery('')
		setShowDropdown(false)
	}

	return (
		<div className='relative w-full mb-5'>
			<div className='flex items-center border border-gray-600 rounded-full px-4 py-2 bg-[var(--second-bg)]'>
				<span className='text-gray-400 mr-2'>
					<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9ZM9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C11.125 18 13.0779 17.2636 14.6175 16.032L18.2928 19.7073C18.6834 20.0978 19.3165 20.0978 19.7071 19.7073C20.0976 19.3168 20.0976 18.6836 19.7071 18.2931L16.0318 14.6178C17.2635 13.0781 18 11.1251 18 9C18 4.02944 13.9706 0 9 0Z'
							fill='#828289'
						/>
					</svg>
				</span>
				<input
					type='text'
					placeholder={placeholder}
					value={query}
					onChange={e => setQuery(e.target.value)}
					className='bg-transparent outline-none text-white w-full'
				/>
			</div>

			{showDropdown && (
				<ul className='absolute top-full left-0 right-0 mt-1 bg-neutral-800 border border-gray-600 rounded-lg max-h-60 overflow-y-auto z-10'>
					{filteredTags.map((tag, index) => (
						<li
							key={index}
							className='px-4 py-2 hover:bg-neutral-700 text-white cursor-pointer flex justify-between items-center'
							onClick={() => handleAdd(tag)}
						>
							<span>{tag}</span>
							<span className='text-green-400 text-xl'>
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
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search
