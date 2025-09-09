import { useEffect } from 'react'

import styles from './AccountInfoStep1.module.css'
import { useUserStore } from '@/entities/user/model/store'
import VariantSelection from '@/features/variantSelection/ui/VariantSelection'
import { useCustomTranslation } from '@/shared'
import { Input } from '@/shared/ui/Input'
import { InputWithDropdown } from '@/shared/ui/InputWithDropdown/InputWithDropdown'

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

	const age = useUserStore(state => state.profile.age)
	const nickname = useUserStore(state => state.profile.nickname)
	const gender = useUserStore(state => state.profile.gender)
	const country = useUserStore(state => state.profile.country)
	const city = useUserStore(state => state.profile.city)
	const setProfileField = useUserStore(state => state.setProfileField)

	useEffect(() => {
		if (!country && city) {
			setProfileField('city', '')
		}
	}, [country, city, setProfileField])

	const InputData = [
		{
			label: label2,
			type: 'text',
			name: 'name',
			value: nickname,
			onChange: (value: string) => setProfileField('nickname', value),
			placeholder: placeholder2
		},
		{
			label: label1,
			type: 'number',
			name: 'age',
			placeholder: placeholder1,
			value: age,
			max: 110,
			onChange: (value: string) => setProfileField('age', value),
			notification
		}
	]

	const countryData = [
		{ label: 'Украина', code: 'ua' },
		{ label: 'Россия', code: 'ru' }
	]

	const uaCities = [
		{ label: 'Киев', code: 'kyiv' },
		{ label: 'Одесса', code: 'odesa' }
	]

	const ruCities = [
		{ label: 'Москва', code: 'moscow' },
		{ label: 'Санкт-Петербург', code: 'spb' }
	]

	const genders = [
		{ code: 'MALE', label: button1 },
		{ code: 'FEMALE', label: button2 }
	]

	const handleGenderChange = (gender: string) => {
		setProfileField('gender', gender)
	}

	const handleCountryChange = (code: string) => {
		setProfileField('country', code)
		if (code && city) {
			setProfileField('city', '')
		}
	}

	return (
		<div className='flex flex-col gap-8 pb-40'>
			<h2 className={styles.title}>{title}</h2>
			<div className='flex flex-col gap-6'>
				{InputData.map((item, index) => (
					<Input key={index} data={item} />
				))}
			</div>
			<div>
				<h3 className='mb-3'>{label3}</h3>
				<VariantSelection
					variant='row'
					data={genders}
					selected={gender || ''}
					onSelect={handleGenderChange}
				/>
			</div>
			<div>
				<h3 className='mb-2'>{label4}</h3>
				<div className='flex gap-2.5'>
					<InputWithDropdown
						data={countryData}
						value={country}
						onChange={handleCountryChange}
						placeholder={countryPlaceHolder}
					/>
					<InputWithDropdown
						data={
							country === 'ua' ? uaCities : country === 'ru' ? ruCities : []
						}
						value={city}
						onChange={value => setProfileField('city', value)}
						placeholder='Выберите город'
						disabled={!country}
					/>
				</div>
			</div>
		</div>
	)
}

export default AccountInfoStep1
