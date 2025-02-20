import { useState } from 'react'

import styles from './DropDown.module.css'
import ArrowIco from './assets/arrow.svg?react'
import { useCustomTranslation } from '@/6.shared/lib'

interface DropDownProps {
	data: { label: string; code: string }[]
	country: string
	setCountry: (country: string) => void
}

export const DropDown: React.FC<DropDownProps> = ({
	data,
	country,
	setCountry
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleDropdown = () => setIsOpen(!isOpen)
	const { placeholder } = useCustomTranslation('dropDown')

	const handleSelect = (label: string) => {
		setCountry(label)
		setIsOpen(false)
	}

	return (
		<div className='relative w-full'>
			<button className={styles.button} onClick={toggleDropdown}>
				<span className={!country ? styles.placeholder : styles.selected}>
					{country || placeholder}
				</span>
				<ArrowIco
					style={{
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.3s ease'
					}}
				/>
			</button>

			{isOpen && (
				<ul className='absolute mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg'>
					{data.map(item => (
						<li
							key={item.code}
							className='px-4 py-2 cursor-pointer hover:bg-gray-700'
							onClick={() => handleSelect(item.label)}
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
