import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { useProfileHeader } from '@/shared/lib/hooks/useNotificationHeader';

const ProfileInfoOnline = () => {
	const { NotificationHeaderWrapper } = useProfileHeader({
		title: 'Инфо: Онлайн',
		back: true,
		notification: true
	});

	return (
		<>
			<div className=''>
				<div className=' mb-2.5'>
					<NotificationHeaderWrapper />
				</div>
				<div className=' mb-4'></div>
			</div>
		</>
	);
};

export default AnimatedPage(ProfileInfoOnline);
