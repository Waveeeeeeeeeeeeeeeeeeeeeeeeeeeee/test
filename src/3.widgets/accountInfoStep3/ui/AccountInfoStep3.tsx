import { useSkillsState } from '../model/skillState'

import styles from './AccountInfoStep3.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'
import { Input } from '@/6.shared/ui/Input'

const AccountInfoStep3 = () => {
	const { title, description, label, placeholder, button1, button2, button3 } =
		useCustomTranslation('accountInfoStep3')
	const { skills, setSkills, hobby, setHobby } = useSkillsState()
	const skillsData = [
		{ code: 'newer', label: button1 },
		{ code: 'midle', label: button2 },
		{ code: 'hard', label: button3 }
	]
	const InputData = {
		label: label,
		type: 'text',
		name: 'hobby',
		placeholder: placeholder,
		value: hobby,
		onChange: setHobby
	}
	return (
		<div className='flex flex-col gap-6'>
			<h2 className={styles.title}>{title}</h2>
			<div>
				<p className={styles.description}>{description}</p>
				<VariantSelection
					data={skillsData}
					selectedLanguage={skills}
					setLanguage={setSkills}
				/>
			</div>
			<div>
				<Input data={InputData} />
			</div>
		</div>
	)
}

export default AccountInfoStep3
