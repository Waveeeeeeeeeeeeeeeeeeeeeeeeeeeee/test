import { useCustomTranslation } from '@/shared';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';
import TargetSearchList from '@/widgets/targetSearchList/ui/TargetSearchList';

const Home = () => {
	const { searchModes } = useCustomTranslation('home');

	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<div className=' mb-3.5'>
				<NotificationHeaderFactory
					title={searchModes}
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
