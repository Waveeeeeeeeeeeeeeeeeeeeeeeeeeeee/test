import clsx from 'clsx'
import React from 'react'

import AcceptIco from '../../assets/icons/accept.svg?react'

import styles from './Button.module.css'
import ArrowIco from './assets/arrow.svg?react'

type ButtonProps = {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'next' | 'accept'
	disabled?: boolean
	size?: 'normal' | 'large'
	type?: 'submit' | 'reset' | 'button'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	variant = 'primary',
	disabled,
	size = 'normal',
	type = 'button'
}) => {
	return (
		<button
			className={clsx(styles.button, styles[variant], styles[size])}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{children}
			{variant === 'next' && <ArrowIco />}
			{variant === 'accept' && <AcceptIco />}
		</button>
	)
}
