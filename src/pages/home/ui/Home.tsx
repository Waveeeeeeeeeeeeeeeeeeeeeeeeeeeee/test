import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { useNotificationHeader } from '@/shared/lib/hooks/useNotificationHeader';
import TargetSearchList from '@/widgets/targetSearchList/ui/TargetSearchList';

const Home = () => {
	const { NotificationHeaderWrapper } = useNotificationHeader({
		title: 'Режимы поиска',
		back: true,
		notification: true
	});
	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<div className=' mb-3.5'>
				<NotificationHeaderWrapper />
			</div>
			<div className='bg-black'>
				<TargetSearchList />
			</div>
		</div>
	);
};

export default AnimatedPage(Home);
