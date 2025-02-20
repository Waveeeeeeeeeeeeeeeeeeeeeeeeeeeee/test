import pubgImg from '../assets/pubg.png'
import pubgnew from '../assets/pubgnewstate.jpg'
import { useSelectionStore } from '../model/choosingGame'

import styles from './AccountInfoStep1.module.css'
import ChoosingButtons from '@/4.features/choosingButtons/ui/ChoosingButtons'
import { useCustomTranslation } from '@/6.shared'

const buttonsData = [
	'PUBG Mobile',
	'PUBG NEW STATE',
	'MOBILE LEGENDS',
	'BRAWL STARS',
	'GENSHIN',
	'HONKAI',
	'HONOR OF KINGS',
	'FREEFIRE'
]

const AccountInfoStep1 = () => {
	const { title, subtitle } = useCustomTranslation('accountInfoStep1')
	const { selected, toggleSelection } = useSelectionStore()
	return (
		<div className='flex flex-col'>
			<div className={styles.header}>
				<img src={pubgnew} alt='pubg new state' />
				<img src={pubgImg} alt='pubg' />
			</div>
			<div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.subtitle}>{subtitle}</p>
				<ChoosingButtons
					data={buttonsData}
					selected={selected}
					toggleSelection={toggleSelection}
				/>
			</div>
		</div>
	)
}

export default AccountInfoStep1
