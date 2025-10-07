import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

const ProfileInfoOnline = () => {
	return (
		<>
			<div className=''>
				<div className=' mb-2.5'>
					<NotificationHeaderFactory
						title='Инфо: Онлайн'
						IsBack={true}
						notification={false}
					/>
				</div>
				<div className=' mb-4'></div>
			</div>
		</>
	);
};

export default AnimatedPage(ProfileInfoOnline);
