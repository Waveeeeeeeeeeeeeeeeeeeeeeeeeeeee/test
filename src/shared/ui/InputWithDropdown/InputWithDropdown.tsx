import { useEffect, useState } from 'react'

import ArrowIco from '../Dropdown/assets/arrow.svg?react'

import styles from './InputWithDropdown.module.css'

interface InputWithDropdownProps {
	data: { label: string; code: string }[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
}

export const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
	data,
	value,
	onChange,
	placeholder,
	disabled
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [selectedCode, setSelectedCode] = useState('')

	const toggleDropdown = () => setIsOpen(!isOpen)

	useEffect(() => {
		const selectedItem = data.find(item => item.code === value)
		if (selectedItem) {
			setInputValue(selectedItem.label)
			setSelectedCode(selectedItem.code)
		} else {
			setInputValue(value)
			setSelectedCode('')
		}
	}, [value, data])

	const handleSelect = (code: string) => {
		const selectedItem = data.find(item => item.code === code)
		if (selectedItem) {
			onChange(selectedItem.code)
			setInputValue(selectedItem.label)
			setSelectedCode(code)
		}
		setIsOpen(false)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
		const matchingItem = data.find(item => item.label === value)
		if (matchingItem) {
			onChange(matchingItem.code)
			setSelectedCode(matchingItem.code)
		} else {
			onChange(value)
			setSelectedCode('')
		}
	}

	const handleBlur = () => {
		const matchingItem = data.find(item => item.label === inputValue)
		if (matchingItem && matchingItem.code !== selectedCode) {
			onChange(matchingItem.code)
			setSelectedCode(matchingItem.code)
		}
	}

	return (
		<div className={`relative w-full`}>
			<div className='flex items-center relative'>
				<input
					type='text'
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleBlur}
					placeholder={placeholder}
					className={`w-full ${styles.input}`}
					disabled={disabled}
				/>
				<button
					onClick={toggleDropdown}
					className='absolute right-2 top-1/2 transform -translate-y-1/2'
					disabled={disabled}
				>
					<ArrowIco
						style={{
							transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
							transition: 'transform 0.3s ease'
						}}
					/>
				</button>
			</div>

			{isOpen && (
				<ul className='absolute mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10'>
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
