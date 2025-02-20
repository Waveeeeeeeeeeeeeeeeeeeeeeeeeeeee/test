import styles from './NumericList.module.css'

interface NumericListProps {
	data: string[]
	link?: { href: string; text: string; position: number }
}

export const NumericList: React.FC<NumericListProps> = ({ data, link }) => {
	return (
		<div className='flex flex-col gap-4'>
			{data.map((list, index) => (
				<div key={index} className='flex items-start gap-3'>
					<span className={styles.number}>{index + 1}</span>
					<div className={styles.listItem}>
						<div>{list}</div>
						{link && link.position === index && link.href && link.text && (
							<a
								className='text-[var(--violet)] flex items-center mt-2'
								href={link.href}
							>
								{link.text} 👉{' '}
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
