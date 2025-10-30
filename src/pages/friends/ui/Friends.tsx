import styles from './Friend.module.css';
import { useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import FriendList from '@/widgets/friendList/ui/FriendList';

const Friends = () => {
  const { title } = useCustomTranslation('friends');
  return (
    <div className='p-4 flex flex-col gap-5'>
			<h1 className={styles.title}>{title}</h1>
			<FriendList />
		</div>);

};

export default AnimatedPage(Friends);