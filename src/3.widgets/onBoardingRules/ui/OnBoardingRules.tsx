import { format } from 'date-fns'
import { useNavigate } from 'react-router'

import BackArrowIco from '../assets/backArrow.svg?react'
import rulesImg from '../assets/rulesImg.svg'

import styles from './OnBoardingRules.module.css'
import { Button, useCustomTranslation } from '@/6.shared'
import { NumericList } from '@/6.shared/ui/NumericList'

const link = { href: '#', text: 'Boost Ace 😏', position: 0 }

interface OnBoardingRulesProps {
	close: () => void
	handleResetSteps: () => void
}
const OnBoardingRules = ({ close, handleResetSteps }: OnBoardingRulesProps) => {
	const navigate = useNavigate()
	const {
		title,
		description,
		numeric1,
		numeric2,
		numeric3,
		info,
		admin,
		button,
		declineButton
	} = useCustomTranslation('onBoardingRules')
	const formattedDate = format(new Date(), 'MMMM d, yyyy')

	const handleNavigetoAccount = () => {
		navigate('/account-info')
	}
	return (
		<div className={styles.rules}>
			<div className='flex items-center justify-between'>
				<button className=' cursor-pointer' onClick={close}>
					<BackArrowIco />
				</button>
				<h2 className={styles.title}>{title}</h2>
				<div></div>
			</div>
			<div className={styles.rulesImg}>
				<img src={rulesImg} alt='rulesImg' />
			</div>
			<div className={styles.imgInfo}>ACE FRIENDS • {formattedDate}</div>
			<hr className={styles.line}></hr>
			<div className={styles.description}>{description}</div>
			<NumericList data={[numeric1, numeric2, numeric3]} link={link} />
			<div className={styles.info}>{info}</div>
			<hr className={styles.line}></hr>
			<div className={styles.admin}>{admin}</div>
			<div className='flex flex-col gap-2.5 w-full mt-5'>
				<Button size='large' variant='primary' onClick={handleNavigetoAccount}>
					{button}
				</Button>
				<Button size='large' variant='secondary' onClick={handleResetSteps}>
					{declineButton}
				</Button>
			</div>
		</div>
	)
}

export default OnBoardingRules
