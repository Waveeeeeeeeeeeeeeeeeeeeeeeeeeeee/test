import clsx from 'clsx'
import React from 'react'

import styles from './Button.module.css'
import ArrowIco from './assets/arrow.svg?react'

type ButtonProps = {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'next'
	disabled?: boolean
	size?: 'normal' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	variant = 'primary',
	disabled,
	size = 'normal'
}) => {
	return (
		<button
			className={clsx(styles.button, styles[variant], styles[size])}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
			{variant === 'next' && <ArrowIco />}
		</button>
	)
}
