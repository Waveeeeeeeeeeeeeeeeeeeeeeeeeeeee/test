import styles from './Input.module.css'

interface InputProps {
	data: {
		type: string
		label: string
		name: string
		placeholder: string
		value?: string | number
		notification?: string
		onChange: (value: string) => void
		max?: number
	}
}

export const Input = ({ data }: InputProps) => {
	return (
		<div className='flex flex-col'>
			<label className={styles.label}>
				{data.label}
				<input
					type={data.type}
					placeholder={data.placeholder}
					value={data.value}
					onChange={e => {
						const value = e.target.value
						if (
							data.type === 'number' &&
							data.max !== undefined &&
							+value > data.max
						)
							return
						data.onChange(value)
					}}
				/>
			</label>
			{data.notification && (
				<p className={styles.notification}>{data.notification}</p>
			)}
		</div>
	)
}
