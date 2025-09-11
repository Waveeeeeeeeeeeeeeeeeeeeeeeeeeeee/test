import clsx from 'clsx';

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
		max?: number;
		labelColor?: string;
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
						'text-sm transition-colors',
						data.labelColor ?? 'text-white',
						'group-focus-within:text-white'
					)}
				>
					{data.label}
				</span>

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
					className='w-full p-3 rounded-lg bg-gray-800 border border-gray-600 
                     focus:outline-none focus:ring-1 focus:ring-[#32302F] text-white'
				/>
			</label>

			{data.notification && (
				<p className={styles.notification}>{data.notification}</p>
			)}
		</div>
	);
};
