import styles from './OnboardingStep2.module.css'
import { GameList } from '@/3.widgets/gameList/ui/GameList'
import { useCustomTranslation } from '@/6.shared'

export const OnboardingStep2 = () => {
	const { title } = useCustomTranslation('onboardingStep2')

	return (
		<div className='relative flex flex-col gap-7'>
			<h2 className={styles.title}>{title}</h2>
			<GameList />
		</div>
	)
}
