import clsx from 'clsx'
import React from 'react'

import styles from './ToggleTabs.module.css'

type ToggleOption = {
	label: string
	value: string
	subtitle?: string
	icon?: React.ReactNode
}

type ToggleTabsProps = {
	options: ToggleOption[]
	active: string
	onChange: (val: string) => void
	variant?: 'accent' | 'base'
}

const colorVariant = (value: string) => {
	switch (value) {
		case 'accent': {
			return 'var(--color-green)'
		}
		case 'base': {
			return '#201e1d'
		}
	}
}

export const ToggleTabs: React.FC<ToggleTabsProps> = ({
	options,
	active,
	onChange,
	variant = 'accent'
}) => {
	const activeIndex = options.findIndex(opt => opt.value === active)

	return (
		<div className='relative flex bg-zinc-900 w-full p-1 rounded-full overflow-hidden'>
			<span
				className={clsx(
					`absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-[${colorVariant(variant)}] transition-transform duration-300 ease-in-out`
				)}
				style={{
					transform: `translateX(${activeIndex * 100}%)`
				}}
			/>

			{options.map(opt => {
				const isActive = opt.value === active
				return (
					<button
						key={opt.value}
						onClick={() => onChange(opt.value)}
						className={clsx(
							'relative z-10 w-1/2 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer',
							isActive ? styles[`${variant}_active`] : styles[variant]
						)}
					>
						<div className='flex items-center gap-2 text-sm font-medium'>
							<span>{opt.label}</span>
						</div>
						{opt.subtitle && (
							<div className='flex items-center gap-1'>
								{opt.icon && <span>{opt.icon}</span>}
								<span
									className={clsx(
										'text-xs mt-0.5',
										isActive ? 'text-black/70' : 'text-gray-500'
									)}
								>
									{opt.subtitle}
								</span>
							</div>
						)}
					</button>
				)
			})}
		</div>
	)
}
