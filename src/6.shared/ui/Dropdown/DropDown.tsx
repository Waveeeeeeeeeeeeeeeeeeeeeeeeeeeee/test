import { useState } from 'react'

import styles from './DropDown.module.css'
import ArrowIco from './assets/arrow.svg?react'

interface DropDownProps {
	data: { label: string; code: string }[]
	selectedValue: string
	onSelect: (code: string) => void
	placeholder?: string
}

export const DropDown: React.FC<DropDownProps> = ({
	data,
	selectedValue,
	onSelect,
	placeholder
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleDropdown = () => setIsOpen(!isOpen)
	const selectedItem = data.find(item => item.code === selectedValue)

	const handleSelect = (code: string) => {
		onSelect(code)
		setIsOpen(false)
	}

	return (
		<div className='relative w-full'>
			<button className={styles.button} onClick={toggleDropdown}>
				<span className={!selectedValue ? styles.placeholder : styles.selected}>
					{selectedItem?.label || placeholder}
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
							onClick={() => handleSelect(item.code)}
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
