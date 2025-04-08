import styles from './TextArea.module.css'

interface TextAreaProps {
	data: {
		label: string
		name: string
		placeholder: string
		value?: string
		minLength?: number
		maxLength?: number
		notification?: string
		onChange: (value: string) => void
	}
}

export const TextArea = ({ data }: TextAreaProps) => {
	return (
		<div className='flex flex-col'>
			<label className={styles.label}>
				{data.label}
				<textarea
					name={data.name}
					placeholder={data.placeholder}
					value={data.value}
					minLength={data.minLength}
					maxLength={data.maxLength}
					onChange={e => data.onChange(e.target.value)}
				/>
			</label>
			{data.notification && (
				<p className={styles.notification}>{data.notification}</p>
			)}
		</div>
	)
}
