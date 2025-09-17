import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './Input.module.css';

interface InputProps {
	data: {
		type: string;
		label: string;
		name: string;
		placeholder: string;
		value?: string | number;
		notification?: string;
		onChange: (value: string) => void;
		onBlur?: (value: string) => void;
		max?: number;
		labelSize?: string;
		labelColor?: string;
		iconRight?: ReactNode;
	};
}

export const Input = ({ data }: InputProps) => {
	return (
		<div className='flex flex-col'>
			<label
				className={clsx(styles.label, 'flex flex-col group transition-colors')}
			>
				<span
					className={clsx(
						data.labelSize || 'text-sm', // используем labelSize или fallback
						'transition-colors',
						data.labelColor ?? 'text-white',
						'group-focus-within:text-white'
					)}
				>
					{data.label}
				</span>

				<div className='relative'>
					<input
						type={data.type}
						name={data.name}
						placeholder={data.placeholder}
						value={data.value}
						onChange={e => {
							const value = e.target.value;
							if (
								data.type === 'number' &&
								data.max !== undefined &&
								+value > data.max
							)
								return;
							data.onChange(value);
						}}
						onBlur={e => {
							data.onBlur?.(e.target.value); // 👈 вызываем, если передали
						}}
						className='w-full p-3 pr-10 rounded-lg bg-gray-800 border border-gray-600 
                       focus:outline-none focus:ring-1 focus:ring-[#32302F] text-white'
					/>

					{data.iconRight && (
						<div className='absolute right-3 top-1/2 -translate-y-1/2 text-green-500'>
							{data.iconRight}
						</div>
					)}
				</div>
			</label>

			{data.notification && (
				<p className={styles.notification}>{data.notification}</p>
			)}
		</div>
	);
};
