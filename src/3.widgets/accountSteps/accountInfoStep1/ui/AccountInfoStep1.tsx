import { useFormStore } from '../model/aboutForm'

import styles from './AccountInfoStep1.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/6.shared'
import { DropDown } from '@/6.shared/ui/Dropdown'
import { Input } from '@/6.shared/ui/Input'

const AccountInfoStep1 = () => {
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
		label4,
		countryPlaceHolder
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
			label: label2,
			type: 'text',
			name: 'name',
			value: nickname,
			onChange: setNickname,
			placeholder: placeholder2
		},
		{
			label: label1,
			type: 'number',
			name: 'age',
			placeholder: placeholder1,
			value: age,
			onChange: setAge,
			notification
		}
	]

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

	const genders = [
		{ code: 'men', label: button1 },
		{ code: 'woman', label: button2 }
	]
	return (
		<div className='flex flex-col gap-8 pb-14'>
			<h2 className={styles.title}>{title}</h2>
			<div className='flex flex-col gap-6'>
				{InputData.map((item, index) => (
					<Input key={index} data={item} />
				))}
			</div>
			<div>
				<h3 className=' mb-3'>{label3}</h3>
				<VariantSelection
					variant='row'
					data={genders}
					selectedLanguage={gender || ''}
					setLanguage={setGender}
				/>
			</div>
			<div>
				<h3 className=' mb-2'>{label4}</h3>
				<DropDown
					data={countryData}
					country={country}
					setCountry={setCountry}
					placeholder={countryPlaceHolder}
				/>
			</div>
		</div>
	)
}

export default AccountInfoStep1
