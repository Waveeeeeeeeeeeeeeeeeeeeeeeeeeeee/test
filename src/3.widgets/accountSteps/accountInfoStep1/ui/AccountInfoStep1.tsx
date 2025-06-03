import styles from './AccountInfoStep1.module.css'
import VariantSelection from '@/4.features/variantSelection/ui/VariantSelection'
import { useUserStore } from '@/5.entities/user/model/store'
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

	const age = useUserStore(state => state.profile.age)
	const nickname = useUserStore(state => state.profile.nickname)
	const gender = useUserStore(state => state.profile.gender)
	const country = useUserStore(state => state.profile.country)
	const setProfileField = useUserStore(state => state.setProfileField)
	const city = useUserStore(state => state.profile.city)
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
		{ code: 'men', label: button1 },
		{ code: 'women', label: button2 }
	]

	const handleGenderChange = (gender: string) => {
		setProfileField('gender', gender)
	}

	const handleCountryChange = (countryCode: string) => {
		setProfileField('country', countryCode)
	}
	const handleCityChange = (cityCode: string) => {
		setProfileField('city', cityCode)
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
					<DropDown
						data={countryData}
						selectedValue={country}
						onSelect={handleCountryChange}
						placeholder={countryPlaceHolder}
					/>
					<DropDown
						data={country === 'ua' ? uaCities : ruCities}
						selectedValue={city}
						onSelect={handleCityChange}
						placeholder={countryPlaceHolder}
					/>
				</div>
			</div>
		</div>
	)
}

export default AccountInfoStep1
