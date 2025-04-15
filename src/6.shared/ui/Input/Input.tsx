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
					onChange={e => data.onChange(e.target.value)}
				/>
			</label>
			{data.notification && (
				<p className={styles.notification}>{data.notification}</p>
			)}
		</div>
	)
}
