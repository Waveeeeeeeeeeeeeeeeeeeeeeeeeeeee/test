import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeader } from '@/shared/ui/NotificationHeader';
import TargetSearchList from '@/widgets/targetSearchList/ui/TargetSearchList';

const Home = () => {
	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<div className=' mb-3.5'>
				<NotificationHeader title='Режимы поиска' />
			</div>
			<div className='bg-black'>
				<TargetSearchList />
			</div>
		</div>
	);
};

export default AnimatedPage(Home);
