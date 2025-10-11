import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { useTelegramRegister } from '@/shared/lib/auth/useTelegramRegister';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import TargetSearchList from '@/widgets/targetSearchList/ui/TargetSearchList';

const Home = () => {
	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<div className=' mb-3.5'>
				<NotificationHeaderFactory
					title='Режимы поиска'
					IsBack={false}
					notification={true}
				/>
			</div>
			<div className='bg-black'>
				<TargetSearchList />
			</div>
		</div>
	);
};

export default AnimatedPage(Home);
