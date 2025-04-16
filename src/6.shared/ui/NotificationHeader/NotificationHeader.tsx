import BackIco from '../../assets/icons/back.svg?react'
import NotificationIco from '../../assets/images/notification.svg?react'

import styles from './NotificationHeader.module.css'

export type NotificationHeaderProps = {
	title: string
	goBack?: () => void
	back?: boolean
	notification?: boolean
}

export const NotificationHeader = ({
	title,
	goBack,
	back = false,
	notification = true
}: NotificationHeaderProps) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2.5'>
				{back && (
					<button className='cursor-pointer' onClick={goBack}>
						<BackIco />
					</button>
				)}
				<h1 className={styles.title}>{title}</h1>
			</div>
			{notification && (
				<button className='cursor-pointer'>
					{' '}
					<NotificationIco fill='white' />
				</button>
			)}
		</div>
	)
}
