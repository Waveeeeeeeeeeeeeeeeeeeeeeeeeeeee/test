import styles from './Friend.module.css'
import FriendList from '@/3.widgets/friendList/ui/FriendList'
import { useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'

const Friends = () => {
	const { title } = useCustomTranslation('friends')
	return (
		<div className='p-4 flex flex-col gap-5'>
			<h1 className={styles.title}>{title}</h1>
			<FriendList />
		</div>
	)
}

export default AnimatedPage(Friends)
