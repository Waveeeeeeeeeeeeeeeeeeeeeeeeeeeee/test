import TargetSearchList from '@/3.widgets/targetSearchList/ui/TargetSearchList'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'

const Home = () => {
	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<div className=' mb-3.5'>
				<NotificationHeader title='Режим поиска' />
			</div>
			<div className='bg-black'>
				<TargetSearchList />
			</div>
		</div>
	)
}

export default AnimatedPage(Home)
