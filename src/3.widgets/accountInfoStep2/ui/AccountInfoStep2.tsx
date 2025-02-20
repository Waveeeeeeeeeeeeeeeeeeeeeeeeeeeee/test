import { useFormStore } from '../model/aboutForm'

import styles from './AccountInfoStep2.module.css'
import { useCustomTranslation } from '@/6.shared'
import { DropDown } from '@/6.shared/ui/Dropdown'
import { Input } from '@/6.shared/ui/Input'
import { SelectButton } from '@/6.shared/ui/SelectButton'

const AccountInfoStep2 = () => {
	const {
		title,
		label1,
		placeholder1,
		notification,
		label2,
		placeholder2,
		label3,
		button1,
		button2,
		label4
	} = useCustomTranslation('accountInfoStep2')
	const {
		age,
		nickname,
		gender,
		country,
		setAge,
		setNickname,
		setGender,
		setCountry
	} = useFormStore()
	const InputData = [
		{
			label: label1,
			type: 'number',
			name: 'age',
			placeholder: placeholder1,
			value: age,
			onChange: setAge,
			notification
		},
		{
			label: label2,
			type: 'text',
			name: 'name',
			value: nickname,
			onChange: setNickname,
			placeholder: placeholder2
		}
	]

	const buttonData = [button1, button2]
	const countryData = [
		{
			label: 'Украина',
			code: 'uk'
		},
		{
			label: 'Россия',
			code: 'ru'
		}
	]
	console.log(age, nickname, gender, country)
	return (
		<div className='flex flex-col gap-6'>
			<h2 className={styles.title}>{title}</h2>
			<div className='flex flex-col gap-6'>
				{InputData.map((item, index) => (
					<Input key={index} data={item} />
				))}
			</div>
			<div>
				<h3 className=' mb-3'>{label3}</h3>
				<SelectButton
					items={buttonData}
					selectedItems={gender}
					onClick={setGender}
				/>
			</div>
			<div>
				<h3 className=' mb-2'>{label4}</h3>
				<DropDown
					data={countryData}
					country={country}
					setCountry={setCountry}
				/>
			</div>
		</div>
	)
}

export default AccountInfoStep2
