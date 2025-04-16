import { useCustomTranslation } from '@/6.shared'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'

const ProfileGames = () => {
	const { title, subtitle } = useCustomTranslation('profileGames')

	const handleBack = () => {
		window.history.back()
	}

	return (
		<div className='p-4 px-4 h-screen relative overflow-scroll pb-20 flex flex-col gap-7.5'>
			<NotificationHeader
				back
				title={title}
				goBack={handleBack}
				notification={false}
			/>
			<h3>{subtitle}</h3>
		</div>
	)
}

export default AnimatedPage(ProfileGames)
