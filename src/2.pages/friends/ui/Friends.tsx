import styles from './Friend.module.css'
import FriendList from '@/3.widgets/friendList/ui/FriendList'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'

const Friends = () => {
	return (
		<div className='p-4 flex flex-col gap-5'>
			<h1 className={styles.title}>Друзья</h1>
			<FriendList />
		</div>
	)
}

export default AnimatedPage(Friends)
