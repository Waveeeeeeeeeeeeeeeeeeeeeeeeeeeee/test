import styles from './OnboardingStep2.module.css'
import Search from '@/4.features/search/Search'
import { useCustomTranslation } from '@/6.shared'

export const OnboardingStep2 = () => {
	const { title, searchHolder } = useCustomTranslation('onboardingStep2')
	return (
		<div className='relative flex flex-col gap-7'>
			<h2 className={styles.title}>{title}</h2>
			<Search tags={[]} addInterest={() => {}} placeholder={searchHolder} />
		</div>
	)
}
